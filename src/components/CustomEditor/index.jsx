import React, { useEffect } from 'react';
import CKEditor from 'ckeditor4-react';

function CustomEditor({ name, data, onChange }) {
	return (
		<React.Fragment>
			<CKEditor
				name={name}
				
				data={data}
				onChange={onChange}
				config={{
					width: '100%',
					height: '500',
					filebrowserImageUploadUrl: `${process.env.REACT_APP_DEV_HOST}/image-upload`,
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
