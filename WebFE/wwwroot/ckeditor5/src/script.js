ClassicEditor
	.create(document.querySelector('.editor'), {
		licenseKey: 'd0MyMHR0a3AvRmhaZnNNTFdYT3VLU2FwVEtlaEZhOStqd1NvaEdNMnpZSVh4N20rZWZkMCtlaEloR2RGLU1qQXlNekV5TVRVPQ==',
		revisionHistory: {
			editorContainer: document.querySelector('.editor-container'),
			viewerContainer: document.querySelector('.revision-viewer-container'),
			viewerEditorElement: document.querySelector('.revision-viewer-editor'),
			viewerSidebarContainer: document.querySelector('.revision-viewer-sidebar')
		},
		ckbox: {
			tokenUrl: 'https://101826.cke-cs.com/token/dev/ZrEch30xxIHOGNFYiRUJWJMfz6M11aL9gZ7U?user.name=Dinesh&limit=10'
		},
		sidebar: {
			container: document.querySelector('.sidebar')
		},
		extraPlugins: [
			// Learn more about users at https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/users.html.
			class UsersInit {
				static get requires() {
					return ['Users'];
				}

				constructor(editor) {
					this.editor = editor;
				}

				init() {
					const users = this.editor.plugins.get('Users');

					users.addUser({
						id: 'u1'
					});

					users.defineMe('u1');
				}
			}
		]
	})
	.then(editor => {
		window.editor = editor;
	})
	.catch(handleSampleError);

function handleSampleError(error) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${issueUrl} with the build id "v5mc3fugpc8b-lenz9mfmqdnm" and the error stack trace:`
	].join('\n');

	console.error(message);
	console.error(error);
}
