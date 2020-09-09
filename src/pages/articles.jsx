import React from 'react';
import PageWrapper from '../layots/PageWrapper';
import CustomEditor from '../components/CustomEditor';

function Articles() {
	return (
		<PageWrapper className='mt-3'>
			<h1>Articles</h1>
			<CustomEditor />
		</PageWrapper>
	);
}

export default Articles;
