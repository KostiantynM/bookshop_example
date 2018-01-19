"use strict"
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers/index';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import routes from './routes';
//STEP 1 create the store
const middleware = applyMiddleware(thunk, logger);
//PASS INITIAL STATE FROM THE SERVER STORE
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);
const Routes = (
	<Provider store={store} >
		{routes}
	</Provider>	
	);

render(
	Routes, document.getElementById('app')
);