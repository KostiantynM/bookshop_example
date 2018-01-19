"use strict"
import React from 'react';
import {render} from 'react-dom';
import {
	Router, 
	Route, 
	IndexRoute, 
	browserHistory
} from 'react-router';
import applyMiddleware from 'redux';
//import thunk from 'redux-thunk';
//import logger from 'redux-logger';
import BooksList from './components/pages/booksList';
import BooksForm from './components/pages/booksForm';
import Cart from './components/pages/cart';
import Main from './main';

//STEP 1 create the store
/*const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);*/
const routes = (
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute components={BooksList} />
				<Route path="/admin" components={BooksForm} />
				<Route path="/cart" components={Cart} />
			</Route>
		</Router>
	);

export default routes;