import React, { useEffect } from 'react';
import Header from '../components/Header/';

function PageWrapper({ children, className }) {
	useEffect(() => {
		document.title = `Arthows admin`;
	});

	return (
		<React.Fragment>
			<Header />
			<div className={`${className} container`}>{children}</div>
		</React.Fragment>
	);
}

export default PageWrapper;
