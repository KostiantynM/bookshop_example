"use strict"
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers/index';
import logger from 'redux-logger';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {addToCart} from './actions/cartActions';
import {addBook, updateBook, deleteBook} from './actions/booksActions';
import Main from './main';
import BooksList from './components/pages/booksList';
import BooksForm from './components/pages/booksForm';
import Cart from './components/pages/cart';

//STEP 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);
const Routes = (
	<Provider store={store} >
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute components={BooksList} />
				<Route path="/admin" components={BooksForm} />
				<Route path="/cart" components={Cart} />
			</Route>

		</Router>
	</Provider>	
	);

render(
	Routes, document.getElementById('app')
	);
//DISPATCH to ADD books
//store.dispatch(addBook(newBooks));
//store.dispatch(addBook(moreNewBooks));

//DISPATCH to DELETE book
//store.dispatch(deleteBook({id:2}));

//DISPATCH to UPDATE book
/*store.dispatch(updateBook({
			id:3,
			title: 'this is the new third updated title',
			description: 'this is the new third updated description',
			price: 13.13
		}));*/

// -->> CART ACTIONS <<--
//DISPATCH to ADD TO THE CART
/*store.dispatch(addToCart([{id:1}]));*/
