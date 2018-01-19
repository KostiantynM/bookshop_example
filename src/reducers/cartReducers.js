"use strict"

// CART REDUCERS

export function cartReducers(state={cart:[]}, action){
	switch(action.type){
		case "GET_CART":
		return {
			...state,
			cart: action.payload,
			totalAmount: calculateTotals(action.payload).totalAmount,
			totalQty: calculateTotals(action.payload).totalQty
		}
		break;

		case "ADD_TO_CART":
		return {
			...state,
			cart: action.payload,
			totalAmount: calculateTotals(action.payload).totalAmount,
			totalQty: calculateTotals(action.payload).totalQty
		};
		break;

		case "UPDATE_CART":	
		return {
			...state,
			cart: action.payload,
			totalAmount: calculateTotals(action.payload).totalAmount,
			totalQty: calculateTotals(action.payload).totalQty
		}
		break;
		
		case "DELETE_CART_ITEM":
		return {
			...state,
			cart: action.payload,
			totalAmount: calculateTotals(action.payload).totalAmount,
			totalQty: calculateTotals(action.payload).totalQty
		};
		break;
	}
	return state
}

export function calculateTotals(payloadItems){
	const totalAmount = payloadItems.map(function(cartItem){
		return cartItem.price * cartItem.qty;
	}).reduce(function(totalAmount, totalItem){
		return totalAmount + totalItem;
	},0);
	const totalQty = payloadItems.map(function(cartItem){
		return cartItem.qty;
	}).reduce(function(totalQty, itemQty){
		return totalQty + itemQty;
	}, 0);

	return {
		totalAmount: totalAmount.toFixed(2),
		totalQty: totalQty
	};
}