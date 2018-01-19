"use strict"
//var axios = require('axios');
import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import reducers from './src/reducers/index';
import routes from './src/routes';

function requestHandler(req, res){
	axios.get('http://localhost:3001/books')
		.then(function(response){
			//STEP-1 CREATE A REDUX STORE ON THE SERVER
			const store = createStore(reducers, {"books":{"books": response.data}});

			//STEP-2 GET INITIAL STATE FROM THE STORE
			//have to defend from JS injection atake!!!!!!!!!!
			const initialState = JSON.stringify(store.getState())
								.replace(/<\/script/g, '<\\/script')
								.replace(/<!--/g, '<\\!--');

			//STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER 
			//TO INTERCEPT CLIENT REQUESTs AND DEFINE 
			//WHAT TO DO WITH THEM
			const Routes = {
				routes: routes,
				location: req.url
			};

			match(Routes, function(err, redirect, props){
				if(err){
					res.status(500).send("ERROR fullfilling the request");
				}else if(redirect){
					res.status(302, redirect.pathname + redirect.search);
				}else if(props){
					const reactComponent = renderToString(
						<Provider store={store}>
							<RouterContext {...props} />
						</Provider>
					);
					res.status(200).render('index', {reactComponent, initialState});
				}else{
					res.status(404).send('Not Found');
				}
			});
			
		})
		.catch(function(err){
			if(err){
				console.log('# Initial Server-side error ', err);
			}
		});
}

module.exports = requestHandler;