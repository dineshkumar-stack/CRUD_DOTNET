const appData = {
    // Users data.
    users: [
        {
            id: 'user-1',
            name: 'Dinesh'
        },
        {
            id: 'user-2',
            name: 'Zee Croce'
        }
    ],

    // The ID of the current user.
    userId: 'user-1',

    // Comment threads data.
    commentThreads: [

        //{
        //    "threadId": "e155a9cabff70ba113ef254a5c24bbb55",
        //    "comments": [
        //        {
        //            "commentId": "ee65cf4e2185c15e277e33dbba536a80b",
        //            "content": "<p>Done</p>",
        //            "createdAt": "2023-11-21T08:57:46.844Z",
        //            "authorId": "user-1",
        //            "attributes": {}
        //        }
        //    ],
        //    "resolvedAt": null,
        //    "resolvedBy": null,
        //    "context": {
        //        "type": "text",
        //        "value": "Handheld "
        //    },
        //    "attributes": {}
        //}
     ]
      
};



DecoupledEditor
    .create(document.querySelector('.editor'), {

			licenseKey: 'd0MyMHR0a3AvRmhaZnNNTFdYT3VLU2FwVEtlaEZhOStqd1NvaEdNMnpZSVh4N20rZWZkMCtlaEloR2RGLU1qQXlNekV5TVRVPQ==',
			ckbox: {
				tokenUrl: 'https://101826.cke-cs.com/token/dev/ZrEch30xxIHOGNFYiRUJWJMfz6M11aL9gZ7U?user.name=Dinesh&limit=10'
			},
			sidebar: {
				container: document.querySelector( '.sidebar' )
			},

			

			extraPlugins: [
				// Learn more about users at https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/users.html.
				//class UsersInit {
				//	static get requires() {
				//		return [ 'Users' ];
				//	}

				//	constructor( editor ) {
				//		this.editor = editor;
				//	}

				//	init() {
				//		const users = this.editor.plugins.get( 'Users' );

				//		users.addUser( {
				//			id: 'u1',
				//			name: 'Dinesh'
				//		});

				//		users.addUser({
				//			id: 'u2',
				//			name: 'Kumar'
				//		});

				//		users.defineMe( 'u1' );
				//	}
				//},

				class CommentsIntegration {
					constructor(editor) {
						this.editor = editor;
					}

					static get requires() {
						return ['CommentsRepository'];
					}

					init() {
						const usersPlugin = this.editor.plugins.get('Users');
						const commentsRepositoryPlugin = this.editor.plugins.get('CommentsRepository');



						// Set the current user.

						// Load the comment threads data.
						for (const commentThread of appData.commentThreads) {
							commentsRepositoryPlugin.addCommentThread(commentThread);
						}
					}
				},

				class CustomCommentsArchiveUI {
					static get requires() {
						// We will use a property from the `CommentsArchiveUI` plugin, so add it to requires.
						return [ 'CommentsArchiveUI' ];
					}

					constructor( editor ) {
						this.editor = editor;
					}
				
					init() {
						this.tabs = document.querySelectorAll( '.tabs__item' );
						this.sidebars = document.querySelectorAll( '.sidebar' );
				
						// Switch the side panel to the appropriate tab after clicking it.
						this.tabs.forEach( item => {
							item.addEventListener( 'click', () => this.handleTabClick( item ) );
						} );
				
						this.initCommentsArchive();
					}
				
					// Switches between the active tabs.
					// Shows appropriate tab container and set the CSS classes to reflect the changes.
					handleTabClick( tabElement ) {
						if ( tabElement.classList.contains( 'active' ) ) {
							return;
						}
				
						const annotationsUIs = this.editor.plugins.get( 'AnnotationsUIs' );
						const targetId = tabElement.dataset.target;
						const sidebarContainer = document.getElementById( targetId );
				
						this.tabs.forEach( item => {
							item.classList.remove( 'active' );
						} );
				
						this.sidebars.forEach( item => {
							item.classList.remove( 'active' );
						} );
				
						tabElement.classList.add( 'active' );
						sidebarContainer.classList.add( 'active' );
				
						const isCommentsArchiveOpen = targetId === 'archive';
						annotationsUIs.switchTo( isCommentsArchiveOpen ? 'inline' : 'wideSidebar' );
					}
				
					initCommentsArchive() {
						const commentsArchiveList = document.querySelector( '.comments-archive__list' );
						const commentsArchiveUI = this.editor.plugins.get( 'CommentsArchiveUI' );
						for ( const annotationView of commentsArchiveUI.annotationViews ) {
							commentsArchiveList.appendChild( annotationView.element );
						}
						commentsArchiveUI.annotationViews.on( 'add', ( _, annotationView ) => {
							if ( !commentsArchiveList.contains( annotationView.element ) ) {
								commentsArchiveList.appendChild( annotationView.element );
							}
						} );
						commentsArchiveUI.annotationViews.on( 'remove', ( _, annotationView ) => {
							if ( commentsArchiveList.contains( annotationView.element ) ) {
								commentsArchiveList.removeChild( annotationView.element );
							}
						} );
					}
                },

                class CommentsAdapter {
                    constructor(editor) {
                        this.editor = editor;
                    }

                    static get requires() {
                        return ['CommentsRepository'];
                    }

                    init() {
                        const usersPlugin = this.editor.plugins.get('Users');
                        const commentsRepositoryPlugin = this.editor.plugins.get('CommentsRepository');
                        for (const user of appData.users) {
                            usersPlugin.addUser(user);
                        }
                        usersPlugin.defineMe(appData.userId);

                        commentsRepositoryPlugin.adapter = {
                            addComment(data) {
                                console.log('Comment added', data);

                                return Promise.resolve({
                                    createdAt: new Date()      
                                });
                            },

                            updateComment(data) {
                                console.log('Comment updated', data);
                                return Promise.resolve();
                            },

                            removeComment(data) {
                                console.log('Comment removed', data);
                                return Promise.resolve();
                            },

                            addCommentThread(data) {
                                console.log('Comment thread added', data);
                                return Promise.resolve({
                                    threadId: data.threadId,
                                    comments: data.comments.map((comment) => ({ commentId: comment.commentId, createdAt: new Date() })) 
                                });
                            },

                            getCommentThread(data) {
                                console.log('Getting comment thread', data);
                                return Promise.resolve({                                    
                                        "threadId": "e08626919e845adfc0be90760437253bd",
                                        "comments": [
                                            {
                                                "commentId": "e783e5dbc56cec36cd3971039d04ff3bd",
                                                "content": "<p>Main</p>",
                                                "createdAt": "2023-11-21T09:18:41.482Z",
                                                "authorId": "user-1",
                                                "attributes": {}
                                            },

                                            {
                                                "commentId": "ef7867546d91b083a35e4e166a5ac4a0e",
                                                "authorId": "user-1",
                                                "content": "<p>1</p>",
                                                "attributes": {}
                                            },

                                            {
                                                "commentId": "e053af13b42e2c578c350a32235b8f440",
                                                "authorId": "user-1",
                                                "content": "<p>2</p>",
                                                "attributes": {}
                                            }
                                            
                                        ],
                                        "resolvedAt": null,
                                        "resolvedBy": null,
                                        "context": {
                                            "type": "text",
                                            "value": "UNITED "
                                        },
                                    "attributes": {},
                                });
                            },

                            updateCommentThread(data) {
                                console.log('Comment thread updated', data);
                                return Promise.resolve();
                            },

                            resolveCommentThread(data) {
                                console.log('Comment thread resolved', data);
                                return Promise.resolve({
                                    resolvedAt: new Date(),
                                    resolvedBy: usersPlugin.me.id 
                                });
                            },

                            reopenCommentThread(data) {
                                console.log('Comment thread reopened', data);
                                return Promise.resolve();
                            },


                            removeCommentThread(data) {
                                console.log('Comment thread removed', data);
                                return Promise.resolve();
                            }
                        };
                    }
                }
			],

			template: {
				definitions: [
					{
						title: 'Issue acknowledgement (plain text)',
						data: `<h2 class="document-title" id="ea671a9b5b8140eea912f4797d558cf17">
    Handheld emperor
</h2>
<p>
    Nintendo, a Japanese electronics company, started as a <a href="https://en.wikipedia.org/wiki/Hanafuda"><i>hanafuda</i> cards</a> manufacturer in 1889. In the mid-1970s, they entered the early video games market and became famous for their home video and handheld game consoles. Nintendo introduced consoles like <strong>NES</strong>, <strong>SNES</strong>, and <strong>Wii</strong>. But the most revolutionary was for sure the <strong>Game Boy</strong>.
</p>
<h3 class="document-subtitle" id="e4d6547268d1339f72c8867c7fe7d68cf">
    A countdown of Nintendo handhelds
</h3>
<figure class="image image-style-side image_resized" style="width:17.33%;">
    <img src="https://ckeditor.com/docs/ckeditor5/latest/assets/img/game_boy.jpg" width="384" sizes="100vw">
    <figcaption>
        The Nintendo "flagship" - handheld Game Boy
    </figcaption>
</figure>
<ol style="list-style-type:decimal;">
    <li>
        <span style="color:hsl(0,75%,60%);"><strong>Game &amp; Watch</strong></span> was Nintendo's first product offering out-of-home gaming. From 1980 to 1991, over a hundred games were released, gaining great popularity.
    </li>
    <li>
        In 1989, &nbsp;the original <span style="color:hsl(0,75%,60%);"><strong>Game Boy</strong></span> was released. The new amazing machine utilized a cartridge system, allowing the users to play a multitude of games of all kinds. This was <mark class="marker-yellow">a historical game-changer</mark>. &nbsp;
    </li>
    <li>
        In 2004, Nintendo introduced a new console family called the <span style="color:hsl(0,75%,60%);"><strong>Nintendo DS</strong></span>. It sported a dual LCD screen in a folded shell, with the lower one being a touchscreen.
    </li>
    <li>
        2017 brought the hybrid experience for both couch-preferring gamers and handheld enthusiasts with the release of the <span style="color:hsl(0,75%,60%);"><strong>Nintendo Switch</strong></span>. It offers both a TV mode with high-definition graphics and a handheld mode using the built-in 6.2” display.&nbsp;
    </li>
</ol>
<h3 class="document-subtitle" id="e67f1d7ca3795f1b82c4b21e4f230ea25">
    Handheld consoles' popularity
</h3>
<p>
    While the most recent Switch is a prevalent choice nowadays, the 2DS and 3DS consoles are still popular. The king, however, is none other than the original wonder — the Game Boy.
</p>
<figure class="table">
    <table>
        <tbody>
            <tr>
                <td style="background-color:hsl(0, 0%, 60%);">
                    <span style="color:hsl(60,75%,60%);">Console</span>
                </td>
                <td style="background-color:hsl(0, 0%, 60%);">
                    <span style="color:hsl(60,75%,60%);">Production dates</span>
                </td>
                <td style="background-color:hsl(0, 0%, 60%);">
                    <span style="color:hsl(60,75%,60%);">Pieces sold (2021)</span>
                </td>
            </tr>
            <tr>
                <td style="background-color:hsl(0, 0%, 90%);">
                    Game &amp; Watch
                </td>
                <td style="background-color:hsl(0, 0%, 90%);">
                    1980-1991, 2020-2021
                </td>
                <td style="background-color:hsl(0, 0%, 90%);">
                    44 million
                </td>
            </tr>
            <tr>
                <td>
                    Game Boy
                </td>
                <td>
                    1989-2010
                </td>
                <td>
                    <span style="color:hsl(0,75%,60%);">201 million</span> <sup>1</sup>
                </td>
            </tr>
            <tr>
                <td style="background-color:hsl(0, 0%, 90%);">
                    Nintendo DS
                </td>
                <td style="background-color:hsl(0, 0%, 90%);">
                    2011-2020
                </td>
                <td style="background-color:hsl(0, 0%, 90%);">
                    76 million <sup>2</sup>
                </td>
            </tr>
            <tr>
                <td>
                    Switch
                </td>
                <td>
                    since 2017
                </td>
                <td>
                    123 million <sup>3</sup>
                </td>
            </tr>
            <tr>
                <td style="background-color:hsl(0, 0%, 90%);" colspan="3">
                    <span style="font-size:10px;"><sup>1 </sup>119 million Game Boy and Game Boy Color variants, 82 million Game Boy Advance variants.</span><br>
                    <span style="font-size:10px;"><sup>2</sup> Including all versions: DS, DSi, 2DS, 3DS, and New 2DS/3DS variants.</span><br>
                    <span style="font-size:10px;"><sup>3</sup> As of mid-2023.</span>
                </td>
            </tr>
        </tbody>
    </table>
</figure>
<h3 class="document-subtitle" id="e7647be7a2500df4dacc42261ff3171d3">
    Handheld gaming experience
</h3>
<blockquote class="side-quote">
    <p style="text-align:right;">
        It's dangerous to go alone! Take this.&nbsp;<br>
        <span style="font-size:18px;"><i>The Legend of Zelda, 1986</i></span>
    </p>
</blockquote>
<p>
    Games offered by Nintendo include multiple genres, out of which the famous platformer arcade <i>Super Mario</i> <img class="image_resized" style="width:2.3%;" src="https://ckeditor.com/docs/ckeditor5/latest/assets/img/mario.png"> and the adventure role-play <i>Legend of Zelda</i> <img class="image_resized" style="width:2.3%;" src="https://ckeditor.com/docs/ckeditor5/latest/assets/img/link.png"> series are probably the most iconic.
</p>
<hr>
<p>
    Games that can be played on the handheld family include (examples of games listed):
</p>
<ul>
    <li>
        Action &amp; adventure games
        <ul>
            <li>
                The <i>Legend of Zelda</i> series
            </li>
            <li>
                <i>Chrono Trigger</i>
            </li>
        </ul>
    </li>
    <li>
        First-person action games
        <ul>
            <li>
                <i>Splatoon</i>
            </li>
        </ul>
    </li>
    <li>
        Role-playing games (RPG)
        <ul>
            <li>
                The <i>Pokemon</i> series
            </li>
            <li>
                The <i>Final Fantasy</i> series
            </li>
        </ul>
    </li>
</ul>`
					},
					{
						title: 'Sec',
                        data: `<p style="margin-left:0px;text-align:center;">
    <strong>UNITED STATES</strong><br>
    <strong>SECURITIES AND EXCHANGE COMMISSION</strong>
</p>
<p style="margin-left:0px;text-align:center;">
    <strong>WASHINGTON, D.C. 20549</strong>
</p>
<p style="text-align:center;"><strong>FORM 10-K/A</strong></p>
<p style="text-align:center;"><strong>(Amendment No. 1)</strong></p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;">(Mark One)</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="width:18.4062px;">&nbsp;</td>
                <td style="width:73.625px;">&nbsp;☒</td>
                <td style="text-align:justify;width:1748.97px;">ANNUAL REPORT UNDER SECTION 13 OR 15 (d) OF THE
                    SECURITIES EXCHANGE ACT OF 1934</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:center;">For the fiscal year ended December 31, 2022</p>
<p style="margin-left:0px;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="width:18.4062px;">&nbsp;</td>
                <td style="width:73.625px;"><br>☐<br>&nbsp;</td>
                <td style="text-align:justify;width:1748.97px;">TRANSITION REPORT UNDER SECTION 13 OR 15 (d) OF THE
                    SECURITIES EXCHANGE ACT OF 1934</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:center;">For the transition period from ________ to _______</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:center;">Commission file Number: 000-50587</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:center;"><strong>WRIGHT INVESTORS’ SERVICE HOLDINGS, INC.</strong></p>
<p style="margin-left:0px;text-align:center;">(Exact Name of Registrant as Specified in Its Charter)</p>
<p style="margin-left:0px;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="border-bottom:1pt solid black;text-align:center;width:791.625px;">Delaware</td>
                <td style="width:257.734px;">&nbsp;</td>
                <td style="border-bottom:1pt solid black;text-align:center;width:791.641px;">13-4005439</td>
            </tr>
            <tr>
                <td>
                    <p style="margin-left:0px;text-align:center;">(State or Other Jurisdiction of</p>
                    <p style="margin-left:0px;text-align:center;">Incorporation or Organization)</p>
                </td>
                <td>&nbsp;</td>
                <td style="text-align:center;vertical-align:top;">(IRS Employer Identification Number)</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="width:423.422px;">&nbsp;</td>
                <td style="border-bottom:1pt solid black;text-align:center;width:994.141px;">118 North Bedford Road,
                    Ste. 100, Mount Kisco, NY 10549</td>
                <td style="width:423.438px;">&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td style="text-align:center;">(Address of Principal Executive Offices, including Zip Code)</td>
                <td>&nbsp;</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="width:478.656px;">&nbsp;</td>
                <td style="border-bottom:1pt solid black;text-align:center;width:883.672px;">(914) 242-5700</td>
                <td style="width:478.672px;">&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td style="text-align:center;">(Registrant’s telephone number, including area code)</td>
                <td>&nbsp;</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="width:810.031px;">Securities registered pursuant to Section 12(b) of the Act:</td>
                <td style="width:220.906px;">&nbsp;</td>
                <td style="border-bottom:1pt solid black;width:810.062px;">None</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>Securities registered pursuant to Section 12(g) of the Act:</td>
                <td>&nbsp;</td>
                <td style="border-bottom:1pt solid black;text-align:center;">Common , $0.01 Par Value</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style="text-align:center;">(Title of Class)</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Indicate by check mark if the registrant is a well-known seasoned issuer,
    as defined in Rule 405 of the Securities Act.&nbsp;&nbsp;Yes ☐&nbsp;&nbsp;&nbsp; No ☒</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Indicate by check mark if the registrant is not required to file reports
    pursuant to Section 13 or 15(d) of the Act.&nbsp;&nbsp;Yes ☐&nbsp;&nbsp; No ☒</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Indicate by check mark whether the registrant: (1) has filed all reports
    required to be filed by Section 13 or 15(d) of the Securities Exchange Act of 1934 during the preceding 12 months
    (or for such shorter period that the registrant was required to file such reports), and (2) has been subject to such
    filing requirements for the past 90 days.&nbsp; Yes ☒&nbsp;&nbsp;&nbsp;&nbsp;No ☐</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Indicate by check mark whether the registrant has submitted
    electronically, if any, every Interactive Data File required to be submitted pursuant to Rule 405 of Regulation S-T
    during the preceding 12 months (or for such shorter period that the registrant was required to submit and post such
    files). Yes ☒&nbsp;&nbsp;&nbsp;No&nbsp; ☐</p>
<p style="margin-left:0px;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="width:607.516px;">&nbsp;</td>
                <td style="text-align:center;width:625.938px;">&nbsp;</td>
                <td style="text-align:right;width:607.547px;">&nbsp;</td>
            </tr>
        </tbody>
    </table>
</figure>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="width:1841px;">&nbsp;</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Indicate by check mark whether the registrant is a large accelerated
    filer, an accelerated filer, a non-accelerated filer, a smaller reporting company or, an emerging growth company.
    See the definitions of “large accelerated filer,” “accelerated filer”, “smaller reporting company”, and “emerging
    growth company”, in Rule 12b-2 of the Exchange Act.</p>
<p style="margin-left:0px;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="width:828.438px;">Large accelerated filer&nbsp;☐</td>
                <td style="width:368.188px;">&nbsp;</td>
                <td style="width:644.375px;">Accelerated filer&nbsp;☐</td>
            </tr>
            <tr>
                <td style="vertical-align:top;">Non-accelerated filer&nbsp;☒</td>
                <td style="vertical-align:bottom;">&nbsp;</td>
                <td style="vertical-align:top;">Smaller reporting company&nbsp;☒</td>
            </tr>
            <tr>
                <td style="vertical-align:top;">&nbsp;</td>
                <td style="vertical-align:bottom;">&nbsp;</td>
                <td style="vertical-align:top;">Emerging growth company&nbsp;☐</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">If an emerging growth company, indicate by check mark if&nbsp;the
    registrant&nbsp;has elected not to use the extended transition period for complying with any new or revised
    financial accounting standards provided pursuant to Section 13(a) of the Exchange Act.&nbsp; ☐</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Indicate by check mark whether the registrant has filed a report on and
    attestation to its management’s assessment of the effectiveness of its internal control over financial reporting
    under Section 404(b) of the Sarbanes-Oxley Act (15 U.S.C 7262(b)) by the registered public accounting firm that
    prepared or issued its audit report.&nbsp;&nbsp;Yes&nbsp;☐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No ☐</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Indicate by check mark whether the registrant is a shell company (as
    defined in Rule 12b-2 of the Exchange Act).&nbsp; Yes&nbsp;☒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No&nbsp;☐</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">The aggregate market value of the registrant’s common stock held by
    non-affiliates of the registrant, computed by reference to the price at which the common stock was last sold, or the
    average bid and asked price of such common stock, as of the last business day of the registrant’s most recently
    completed second quarter, is $4,000,000.</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">As of April 27, 2023, 20,620,711 shares of the registrant’s common stock
    were outstanding.</p>`,
                        description: 'SEC Cover Page'
					},
					{
						title: 'SEC 8K',
                        data: `<p style="text-align:center;"><comment-start
        name="e08626919e845adfc0be90760437253bd:08044"></comment-start><strong>UNITED <comment-end
            name="e08626919e845adfc0be90760437253bd:08044"></comment-end>STATES</strong></p>
<p style="text-align:center;"><strong>SECURITIES AND EXCHANGE COMMISSION</strong></p>
<p style="text-align:center;"><strong>WASHINGTON, D.C. 20549</strong></p>
<p style="text-align:center;">&nbsp;</p>
<p style="text-align:center;"><strong>FORM 8-K</strong></p>
<p style="text-align:center;">&nbsp;</p>
<p style="text-align:center;"><strong>CURRENT REPORT</strong></p>
<p style="text-align:center;"><strong>&nbsp;</strong></p>
<p style="text-align:center;"><strong>Pursuant to Section 13 or 15(d) of the</strong></p>
<p style="text-align:center;"><strong>Securities Exchange Act of 1934</strong></p>
<p style="text-align:center;"><strong>&nbsp;</strong></p>
<p style="text-align:center;">Date of report (Date of earliest event reported): November 17, 2023</p>
<p style="text-align:center;"><strong>&nbsp;</strong></p>
<p style="text-align:center;"><strong>GD Culture Group Limited</strong></p>
<p style="text-align:center;"><strong>(Exact name of Company as specified in charter)</strong></p>
<p style="text-align:center;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="border-bottom:1.5pt solid black;text-align:center;width:589.109px;"><strong>Nevada</strong>
                </td>
                <td style="text-align:center;width:36.8125px;">&nbsp;</td>
                <td style="border-bottom:1.5pt solid black;text-align:center;width:589.109px;">
                    <strong>001-37513</strong></td>
                <td style="text-align:center;width:36.8125px;">&nbsp;</td>
                <td style="border-bottom:1.5pt solid black;text-align:center;width:589.156px;">
                    <strong>47-3709051</strong></td>
            </tr>
            <tr>
                <td style="text-align:center;"><strong>(State or other jurisdiction</strong><br><strong>of
                        incorporation)</strong></td>
                <td style="text-align:center;">&nbsp;</td>
                <td style="text-align:center;"><strong>(Commission File No.)</strong></td>
                <td style="text-align:center;">&nbsp;</td>
                <td style="text-align:center;"><strong>(IRS Employer</strong><br><strong>Identification No.)</strong>
                </td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="text-align:center;"><strong>&nbsp;</strong></p>
<p style="text-align:center;">c/o GD Culture Group Limited</p>
<p style="text-align:center;">22F - 810 Seventh Avenue,</p>
<p style="text-align:center;">New York, NY 10019</p>
<p style="text-align:center;"><strong>(Address of Principal Executive Offices) (Zip code)</strong></p>
<p style="text-align:center;">&nbsp;</p>
<p style="text-align:center;">+1-347-2590292</p>
<p style="text-align:center;"><strong>(Company’s Telephone number, including area code)</strong></p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Check the appropriate box below if the Form 8-K filing is intended to
    simultaneously satisfy the filing obligation of the Company under any of the following provisions (see General
    Instruction A.2. below):</p>
<p style="margin-left:0px;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="width:0.25in;">☐</td>
                <td>Written communications pursuant to Rule 425 under the Securities Act (17 CFR 230.425)</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>☐</td>
                <td>Soliciting material pursuant to Rule 14a-12 under the Exchange Act (17 CFR 240.14a-12)</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>☐</td>
                <td>Pre-commencement communications pursuant to Rule 14d-2(b) under the Exchange Act (17 CFR
                    240.14d-2(b))</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>☐</td>
                <td>Pre-commencement communications pursuant to Rule 13e-4(c) under the Exchange Act (17 CFR
                    240.13e-4(c))</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Indicate by check mark whether the registrant is an emerging growth
    company as defined in Rule 405 of the Securities Act of 1933 (§230.405 of this chapter) or Rule 12b-2 of the
    Securities Exchange Act of 1934 (§240.12b-2 of this chapter).</p>
<p style="margin-left:0px;text-align:justify;">&nbsp;</p>
<p style="margin-left:0px;">Emerging growth company&nbsp;☐</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">If an emerging growth company, indicate by check mark if the registrant
    has elected not to use the extended transition period for complying with any new or revised financial accounting
    standards provided pursuant to Section 13(a) of the Exchange Act. ☐</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Securities registered pursuant to Section 12(b) of the Act:</p>
<p style="margin-left:0px;text-align:justify;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="border-bottom:1.5pt solid black;text-align:center;width:589.109px;"><strong>Title of each
                        class</strong></td>
                <td style="text-align:center;width:36.8125px;">&nbsp;</td>
                <td style="border-bottom:1.5pt solid black;text-align:center;width:589.109px;"><strong>Trading
                        Symbol(s)</strong></td>
                <td style="text-align:center;width:36.8125px;">&nbsp;</td>
                <td style="border-bottom:1.5pt solid black;text-align:center;width:589.156px;"><strong>Name of each
                        exchange on which registered</strong></td>
            </tr>
            <tr>
                <td style="text-align:center;">Common Stock, par value $0.0001</td>
                <td style="text-align:center;">&nbsp;</td>
                <td style="text-align:center;">GDC</td>
                <td style="text-align:center;">&nbsp;</td>
                <td style="text-align:center;">Nasdaq Capital Market</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;">&nbsp;</p>
<p>&nbsp;</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0pt;">&nbsp;</p>
<p style="margin-left:0pt;">&nbsp;</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;"><strong>Item 1.01 Entry into a Material Definitive Agreement.</strong>
</p>
<p style="margin-left:0px;text-align:justify;"><strong>&nbsp;</strong></p>
<p style="margin-left:0px;text-align:justify;"><span style="background-color:white;">As previously reported, </span>on
    October 31, 2023, GD Culture Group Limited (the “Company”) entered into a securities purchase agreement (the
    “Securities Purchase Agreement”), pursuant to which the Company sold an aggregate of 1,436,253 shares of common
    stock of the Company, par value $0.0001 per share, (ii) pre-funded warrants to purchase up to an aggregate of
    1,876,103 shares of common stock (the “Pre-Funded Warrants”), and (iii) registered warrants to purchase up to an
    aggregate of 3,312,356 shares of common stock (the “Registered Warrants”) to certain purchasers (the “Purchasers”).
    The purchase price of each Common Share is $3.019. The purchase price of each Pre-funded Warrant is $3.018, which
    equals the price per Common Share being sold in the offering, minus $0.001. The Pre-funded Warrants will be
    exercisable immediately after issuance and will expire five (5) years from the date of issuance. The Registered
    Warrants will be exercisable immediately and will expire five (5) years from the date of issuance. The offering was
    made pursuant to a shelf registration statement on Form&nbsp;S-3 (No.&nbsp;333-254366),&nbsp;which was declared
    effective by the U.S. Securities and Exchange Commission on March 26, 2021, and a related prospectus supplement. The
    transaction was completed on November 3, 2023.</p>
<p style="margin-left:0px;text-align:justify;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;"><span style="background-color:white;"><u>Amendment</u></span></p>
<p style="margin-left:0px;text-align:justify;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">On November 17, 2023, the Company entered into an amendment to the
    Securities Purchase Agreement with the Purchasers, pursuant to which Exhibit B to the Securities Purchase Agreement
    (form of Registered Warrants) was deleted and replaced with an amended and restated the Form of Registered Warrant,
    to remove Section 2(b) Adjustment Upon Issuance of Common Stock and Section 2(e) Other Events.</p>
<p style="margin-left:0px;text-align:justify;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">The Registered Warrants that were issued to Purchasers under the
    Securities Purchase Agreement were returned to and cancelled by the Company on November 17, 2023. Concurrently, the
    Company issued amended and restated Registered Warrants to each Purchaser.</p>
<p style="margin-left:0px;text-align:justify;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">A copy of the amendment to the Securities Purchase Agreement is filed as
    Exhibit 10.1 to this Current Report on Form 8-K and is incorporated herein by reference. The form of amended and
    restated form of Registered Warrants is filed as Exhibit 4.1 to this Current Report on Form 8-K and is incorporated
    herein by reference. The foregoing descriptions of the terms of the amendment to the Securities Purchase Agreement
    and the amended and restated form of Registered Warrants do not purport to be complete descriptions of the rights
    and obligations thereunder and are qualified in their entirety by reference to such exhibits.</p>
<p style="margin-left:0px;">&nbsp;</p>
<p style="margin-left:0px;text-align:center;">&nbsp;</p>
<p style="text-align:center;">1</p>
<p style="margin-left:0pt;">&nbsp;</p>
<p style="margin-left:0px;text-align:center;">&nbsp;</p>
<p style="margin-left:0px;"><strong>Item 9.01. Financial Statements and Exhibits</strong></p>
<p style="margin-left:0px;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="border-bottom:1.5pt solid black;vertical-align:top;width:165.688px;">
                    <strong>Exhibit</strong><br><strong>Number</strong></td>
                <td style="vertical-align:top;width:18.4062px;">&nbsp;</td>
                <td style="border-bottom:1.5pt solid black;vertical-align:bottom;width:1656.91px;"><strong>Description
                        of Exhibit</strong></td>
            </tr>
            <tr>
                <td>4.1</td>
                <td>&nbsp;</td>
                <td><a
                        href="https://www.sec.gov/Archives/edgar/data/1641398/000121390023088350/ea188524ex4-1_gdculture.htm">Form
                        of Amended and Restated Form of Registered Warrants</a></td>
            </tr>
            <tr>
                <td>10.1</td>
                <td>&nbsp;</td>
                <td><a
                        href="https://www.sec.gov/Archives/edgar/data/1641398/000121390023088350/ea188524ex10-1_gdculture.htm">Form
                        of Amendment to the Securities Purchase Agreement</a></td>
            </tr>
            <tr>
                <td>104</td>
                <td>&nbsp;</td>
                <td>Cover Page Interactive Data File (embedded within the Inline XBRL document)</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="margin-left:0px;text-align:justify;">&nbsp;</p>
<p style="margin-left:0px;text-align:center;">&nbsp;</p>
<p style="text-align:center;">2</p>
<p style="margin-left:0pt;">&nbsp;</p>
<p style="margin-left:0px;text-align:center;"><strong>&nbsp;</strong></p>
<p style="margin-left:0px;text-align:center;"><strong>SIGNATURES</strong></p>
<p style="margin-left:0px;text-align:justify;">&nbsp;</p>
<p style="margin-left:0px;text-align:justify;">Pursuant to the requirements of the Securities Exchange Act of 1934, the
    registrant has duly caused this report to be signed on its behalf by the undersigned hereunto duly authorized.</p>
<p style="margin-left:0px;text-align:justify;">&nbsp;</p>
<figure class="table" style="width:1841px;">
    <table>
        <tbody>
            <tr>
                <td style="text-align:justify;">&nbsp;</td>
                <td style="text-align:justify;" colspan="2"><strong>GD CULTURE GROUP LIMITED</strong></td>
            </tr>
            <tr>
                <td style="text-align:justify;">&nbsp;</td>
                <td style="text-align:justify;" colspan="2">&nbsp;</td>
            </tr>
            <tr>
                <td style="text-align:justify;width:1104.59px;">Date: November 17, 2023</td>
                <td style="text-align:justify;width:92.0469px;">By:</td>
                <td style="border-bottom:1.5pt solid black;text-align:justify;width:644.359px;"><i>/s/ Xiaojian Wang</i>
                </td>
            </tr>
            <tr>
                <td style="text-align:justify;">&nbsp;</td>
                <td style="text-align:justify;">Name:&nbsp;</td>
                <td style="text-align:justify;">Xiaojian Wang</td>
            </tr>
            <tr>
                <td style="text-align:justify;">&nbsp;</td>
                <td style="text-align:justify;">Title:</td>
                <td style="text-align:justify;">Chief Executive Officer, President and<br>Chairman of the Board</td>
            </tr>
        </tbody>
    </table>
</figure>
<p style="text-align:center;">&nbsp;</p>`,
                        description: 'Comment'
					},
				]
            },



		})
		.then( editor => {
			window.editor = editor;

			handleSaveButton(editor)
			document.querySelector( '.document-editor__toolbar' ).appendChild( editor.ui.view.toolbar.element );
			document.querySelector('.ck-toolbar').classList.add('ck-reset_all');


			const commentsRepository = editor.plugins.get('CommentsRepository');

			document.querySelector('#get-data').addEventListener('click', () => {
				const editorData = editor.data.get();
				const commentThreadsData = commentsRepository.getCommentThreads({
					skipNotAttached: true,
					skipEmpty: true,
					toJSON: true
				});
				console.log(editorData);
				console.log(commentThreadsData);
			});
		})



		.catch( handleSampleError );

function handleSaveButton(editor) {
	const saveButton = document.querySelector('#save');
	saveButton.addEventListener('click', evt => {
		const data = editor.getData();
		console.log(data)
		alert("HTML Downloaded")
		evt.preventDefault();
		if (data) {
			const blob = new Blob([data], { type: 'text/html' });
			const downloadLink = document.createElement('a');
			downloadLink.href = URL.createObjectURL(blob);
			downloadLink.download = 'output.html';
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		} else {
			console.error('Element with the specified ID not found.');
		}
	});
}


function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${ issueUrl } with the build id "5hqnjomek5o3-hf840mbqnzqx" and the error stack trace:`
	].join( '\n' );

	console.error( message );
	console.error( error );
}



