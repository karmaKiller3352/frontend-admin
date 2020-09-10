import React, { useEffect } from 'react';
import CKEditor from 'ckeditor4-react';

function CustomEditor() {
	useEffect(() => {
		console.log(process.env);
		document.title = `Arthows admin`;
	});

	return (
		<React.Fragment>
			<CKEditor
				data='<p>New article</p>'
				config={{
					width: '100%',
					height: '500',
					filebrowserImageUploadUrl:
						'http://localhost:2000/image-upload',
					toolbarGroups: [
						{
							name: 'paragraph',
							groups: [
								'list',
								'indent',
								'blocks',
								'align',
								'bidi',
								'paragraph',
							],
						},
						{
							name: 'Source',
						},
						{
							name: 'basicstyles',
							groups: ['basicstyles'],
						},
						{
							name: 'links',
							groups: ['links'],
						},

						{
							name: 'document',
							groups: ['mode'],
						},
						{
							name: 'insert',
							groups: ['insert'],
						},
						{
							name: 'styles',
							groups: ['styles'],
						},
						{
							name: 'about',
							groups: ['about'],
						},
					],
				}}
			/>
		</React.Fragment>
	);
}

export default CustomEditor;
