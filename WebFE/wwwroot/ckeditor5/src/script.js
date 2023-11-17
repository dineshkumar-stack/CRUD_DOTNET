DecoupledEditor
		.create( document.querySelector( '.editor' ), {

			licenseKey: 'd0MyMHR0a3AvRmhaZnNNTFdYT3VLU2FwVEtlaEZhOStqd1NvaEdNMnpZSVh4N20rZWZkMCtlaEloR2RGLU1qQXlNekV5TVRVPQ==',
			ckbox: {
				tokenUrl: 'https://101826.cke-cs.com/token/dev/ZrEch30xxIHOGNFYiRUJWJMfz6M11aL9gZ7U?user.name=Dinesh&limit=10'
			},
			sidebar: {
				container: document.querySelector( '.sidebar' )
			},
			extraPlugins: [
				// Learn more about users at https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/users.html.
				class UsersInit {
					static get requires() {
						return [ 'Users' ];
					}

					constructor( editor ) {
						this.editor = editor;
					}

					init() {
						const users = this.editor.plugins.get( 'Users' );

						users.addUser( {
							id: 'u1'
						} );

						users.defineMe( 'u1' );
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
				
						// If the comments archive is open, switch the display mode for comments to "inline".
						//
						// This way the annotations for regular comments threads will be displayed next to them
						// when a user clicks on the comment thread marker.
						//
						// When the comments archive is closed, switch back to displaying comments annotations in the wide sidebar.
						annotationsUIs.switchTo( isCommentsArchiveOpen ? 'inline' : 'wideSidebar' );
					}
				
					initCommentsArchive() {
						// Container for the resolved comment threads annotations.
						const commentsArchiveList = document.querySelector( '.comments-archive__list' );
				
						// The `CommentsArchiveUI` plugin handles all annotation views that can be used
						// to render resolved comment threads inside the comments archive container.
						const commentsArchiveUI = this.editor.plugins.get( 'CommentsArchiveUI' );
				
						// First, handle the initial resolved comment threads.
						for ( const annotationView of commentsArchiveUI.annotationViews ) {
							commentsArchiveList.appendChild( annotationView.element );
						}
				
						// Handler to append new resolved thread inside the comments archive custom view.
						commentsArchiveUI.annotationViews.on( 'add', ( _, annotationView ) => {
							if ( !commentsArchiveList.contains( annotationView.element ) ) {
								commentsArchiveList.appendChild( annotationView.element );
							}
						} );
				
						// Handler to remove the element when thread has been removed or reopened.
						commentsArchiveUI.annotationViews.on( 'remove', ( _, annotationView ) => {
							if ( commentsArchiveList.contains( annotationView.element ) ) {
								commentsArchiveList.removeChild( annotationView.element );
							}
						} );
					}
				}
			],

			template: {
				definitions: [
					{
						title: 'Issue acknowledgement (plain text)',
						data: 'Dear customer, thank you for your report! The issue is currently being worked on by our development team.'
					},
					{
						title: 'Signature',
						data: '<p><b>Dinesh Kumar</b></p><p>EA</p>',
						description: 'Author signature'
					},
					{
						title: 'Pricing table',
						data: '<figure class="table"><table><thead><tr><th style="text-align:center;">Feature</th><th style="background-color:hsl(90, 75%, 60%);text-align:center;">Free</th><th style="background-color:hsl(180, 75%, 60%);text-align:center;">Basic</th><th style="background-color:hsl(0, 75%, 60%);text-align:center;"><span style="color:hsl(0, 0%, 100%);">Professional</span></th><th style="background-color:hsl(270, 75%, 60%);text-align:center;"><span style="color:hsl(0, 0%, 100%);">Custom</span></th></tr></thead><tbody><tr><td style="text-align:center;">Feature #1</td><td style="background-color:hsl(90, 75%, 60%);text-align:center;">✅</td><td style="background-color:hsl(180, 75%, 60%);text-align:center;">✅</td><td style="background-color:hsl(0, 75%, 60%);text-align:center;">✅</td><td style="background-color:hsl(270, 75%, 60%);text-align:center;">✅</td></tr><tr><td style="text-align:center;">Feature #2</td><td style="background-color:hsl(90, 75%, 60%);text-align:center;">❌</td><td style="background-color:hsl(180, 75%, 60%);text-align:center;">✅</td><td style="background-color:hsl(0, 75%, 60%);text-align:center;">✅</td><td style="background-color:hsl(270, 75%, 60%);text-align:center;">✅</td></tr><tr><td style="text-align:center;">Feature #3</td><td style="background-color:hsl(90, 75%, 60%);text-align:center;">❌</td><td style="background-color:hsl(180, 75%, 60%);text-align:center;">❌</td><td style="background-color:hsl(0, 75%, 60%);text-align:center;">✅</td><td style="background-color:hsl(270, 75%, 60%);text-align:center;">✅</td></tr><tr><td style="text-align:center;">Feature #4</td><td style="background-color:hsl(90, 75%, 60%);text-align:center;">❌</td><td style="background-color:hsl(180, 75%, 60%);text-align:center;">❌</td><td style="background-color:hsl(0, 75%, 60%);text-align:center;">❌</td><td style="background-color:hsl(270, 75%, 60%);text-align:center;">✅</td></tr></tbody></table><figcaption>Pricing table</figcaption></figure>',
						icon: '<svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="41" height="41"><rect x="2" y="2" width="41" height="41" rx="5" fill="#59A5FF"/></mask><g mask="url(#a)"><rect x="2" y="2" width="41" height="41" rx="5" fill="#444"/><path fill="#ECECEC" d="M4 17h11v11H4z"/><path fill="#A9E6FA" d="M17 17h11v11H17z"/><path fill="#ECECEC" d="M30 17h11v11H30z"/><path d="M4 7a3 3 0 0 1 3-3h31a3 3 0 0 1 3 3v8H4V7Z" fill="#FF1A88"/><path d="M4 30h11v11H7a3 3 0 0 1-3-3v-8ZM17 30h11v11H17z" fill="#A9E6FA"/><path d="M30 30h11v8a3 3 0 0 1-3 3h-8V30Z" fill="#ECECEC"/></g></svg>',
						description: 'Product pricing table that compares individual plans.'
					},
				]
			}

		})
		.then( editor => {
			window.editor = editor;

			handleSaveButton(editor)
			// Set a custom container for the toolbar.
			document.querySelector( '.document-editor__toolbar' ).appendChild( editor.ui.view.toolbar.element );
			document.querySelector( '.ck-toolbar' ).classList.add( 'ck-reset_all' );
		} )
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


