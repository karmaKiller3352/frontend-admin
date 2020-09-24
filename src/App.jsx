import React from 'react';
import { BrowserRouter, Switch,  } from 'react-router-dom';

import './App.scss';

import ProtectedRoute from './components/ProtectedRote';
import Home from './pages/home';
import Articles from './pages/articles';
import Categories from './pages/categories';
import Users from './pages/users';
import ArticleEdit from './pages/articleEdit';
import ArticleAdd from './pages/articleAdd';
import CategoryAdd from './pages/categoryAdd';
import CategoryEdit from './pages/categoryEdit';

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
					component={ArticleAdd}
				/>
				<ProtectedRoute
					exact
					path={'/admin/articles/:id'}
					component={ArticleEdit}
				/>
				<ProtectedRoute
					exact
					path={'/admin/categories'}
					component={Categories}
				/>
        <ProtectedRoute
					exact
					path={'/admin/categories/add'}
					component={CategoryAdd}
				/>
        <ProtectedRoute
					exact
					path={'/admin/categories/:id'}
					component={CategoryEdit}
				/>
				<ProtectedRoute exact path={'/admin/users'} component={Users} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
