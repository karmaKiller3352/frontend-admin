import React, { useEffect } from 'react';
import Header from '../components/Header/';

function PageWrapper({ children }) {
	useEffect(() => {
		document.title = `Arthows admin`;
	});

	return (
		<React.Fragment>
			<Header />
			<div style={{ padding: '2em' }} className='container mt-3'>
				{children}
			</div>
		</React.Fragment>
	);
}

export default PageWrapper;
