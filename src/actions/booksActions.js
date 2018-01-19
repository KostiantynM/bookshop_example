"use strict"
import axios from 'axios';

export function getBooks(books){
	return function(dispatch){
		axios.get('/api/books')
		.then(function(res){
			dispatch({type: 'GET_BOOKS', payload: res.data});
		})
		.catch(function(err){
			dispatch({type: 'GET_BOOKS_REJECTED', payload: err});
		});
	}
	/*return {
		type: "GET_BOOKS"
	}*/
}
export function addBook(books){
	return function(dispatch){
		axios.post('/api/books', books)
		.then(function(res){
			dispatch({type: 'POST_BOOK', payload: res.data});
		})
		.catch(function(err){
			dispatch({type: 'POST_BOOK_REJECTED', payload: err});
		});
	}

	/*return {
		type: "POST_BOOK",
		payload: books
	}*/
}
export function deleteBook(bookId){
	return function(dispatch){
		axios.delete('/api/books/'+bookId)
		.then(function(res){
			dispatch({type: 'DELETE_BOOK', payload: bookId});
		})
		.catch(function(err){
			dispatch({type: 'DELETE_ACTION_REJECTED', payload: err})
		});
	}
	/*return {
		type: "DELETE_BOOK",
		payload: bookId
	}*/
}
export function updateBook(book){
	return function(dispatch){
		axios.put('/api/books/'+book._id, book)
		.then(function(res){
			dispatch({type: 'UPDATE_BOOK', payload: res.data});
		})
		.then(function(err){
			dispatch({type: 'UPDATE_BOOK_REJECTED', payload: err});
		});
	}
	/*return {
		type: "POST_BOOK",
		payload: book
	}*/
}
export function resetButton(){
	return {
		type: "RESET_BUTTON"
	}
}