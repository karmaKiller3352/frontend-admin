import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss';

import ProtectedRoute from './components/ProtectedRote';
import Home from './pages/home';
import Articles from './pages/articles';
import Categories from './pages/categories';
import Users from './pages/users';
import AddArticle from './pages/addArticle';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<ProtectedRoute exact path={'/admin'} component={Home} />
				<ProtectedRoute
					exact
					path={'/admin/articles'}
					component={Articles}
				/>
				<ProtectedRoute
					exact
					path={'/admin/articles/add'}
					component={AddArticle}
				/>
				<ProtectedRoute
					exact
					path={'/admin/categories'}
					component={Categories}
				/>
				<ProtectedRoute exact path={'/admin/users'} component={Users} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
