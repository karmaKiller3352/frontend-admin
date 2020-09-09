import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	//const isAuth = useSelector((state) => state.user.isAuth);
	const isAuth = true;

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth) {
					return <Component {...rest} {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/login/',
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
