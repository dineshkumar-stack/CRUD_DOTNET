ClassicEditor
	.create(document.querySelector('.editor'), {

		cloudServices: {
			tokenUrl: 'https://example.com/cs-token-endpoint'
		},

		//Font size Added
		fontSize: {
			options: [10, 12, 14, 'default', 18, 20, 22],
			supportAllValues: true
		},

		//Mention Feature added
		mention: {
			feeds: [
				{
					marker: '@',
					feed: ['@Barney', '@Lily', '@Marry Ann', '@Marshall', '@Robin', '@Ted'],
					minimumCharacters: 0
				}
			]
		}
	} )
	.then( editor => {
        window.editor = editor;
        handleSaveButton(editor);
	} )
	.catch(handleSampleError);

function handleSaveButton(editor) {
    const saveButton = document.querySelector('#save');

    saveButton.addEventListener('click', evt => {
        const data = editor.getData();
		console.log(data)
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

//Error response
function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${ issueUrl } with the build id "d5hg63eb4t9m-vs9jn0qxa4gz" and the error stack trace:`
	].join( '\n' );

	console.error( message );
	console.error( error );
}
