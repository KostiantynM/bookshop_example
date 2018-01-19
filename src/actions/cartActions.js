"use strict"
import axios from 'axios';

export function getCart(){
	return function(dispatch){
		axios.get('/api/cart')
		.then(function(res){
			dispatch({type: 'GET_CART', payload: res.data})
		})
		.catch(function(err){
			dispatch({type: 'GET_CART_REJECTED', payload: err})
		});
	}
}

export function addToCart(cart){
	return function(dispatch){
		axios.post('/api/cart', cart)
		.then(function(res){
			dispatch({type: 'ADD_TO_CART', payload: res.data})
		})
		.catch(function(err){
			dispatch({type: 'ADD_TO_CART_REJECTED', payload: res.data})
		});
	}


	/*return {
		type: "ADD_TO_CART",
		payload: cart
	}*/
}

export function deleteCartItem(cart){
	return function(dispatch){
		axios.post('/api/cart', cart)
		.then(function(res){
			dispatch({type: 'DELETE_CART_ITEM', payload: res.data})
		})
		.catch(function(err){
			dispatch({type: 'DELETE_CART_ITEM_REJECTED', payload: res.data})
		});
	}


	/*return {
		type: "DELETE_CART_ITEM",
		payload: cart
	}*/
}

export function updateCart(_id, unit, cart){
	let cartBooks = [...cart];

	let indexForUpdate = cartBooks.findIndex(function(cartItem){
		return cartItem._id === _id;
	});

	let updatedCartItem = {
		...cartBooks[indexForUpdate], 
		qty: cartBooks[indexForUpdate].qty + unit
	};
	let updatedCart = [
		...cartBooks.slice(0, indexForUpdate),
		updatedCartItem,
		...cartBooks.slice(indexForUpdate + 1)];

	return function(dispatch){
		axios.post('/api/cart', updatedCart)
		.then(function(res){
			dispatch({type: 'UPDATE_CART', payload: res.data})
		})
		.catch(function(err){
			dispatch({type: 'UPDATE_CART_REJECTED', payload: res.data})
		});
	}

	/*return {
		type: "UPDATE_CART",
		payload: updatedCart
	}*/
}