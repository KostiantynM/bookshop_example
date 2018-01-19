//STEP 3 define reducers

export function booksReducers(state={books:[]}, action){
	switch(action.type){
		case "RESET_BUTTON":
		return {
			...state, 
			msg: '', 
			style:'primary',
			validurion: null
		}
		break;

		case "GET_BOOKS":
		return {...state, books: action.payload};
		break;

		case "POST_BOOK":
		return {
			...state, 
			books:[...state.books, ...action.payload],
			msg: 'Saved! Click to continue.', 
			style:'success',
			validation: 'success'
		}
		break;

		case "POST_BOOK_REJECTED":
		return {
			...state, 
			msg: 'Please, try to againe', 
			style:'danger',
			validation: 'error'
		}
		break;

		case "DELETE_BOOK":
		const allBooksToDelete = [...state.books];
		const indexToDelete = allBooksToDelete.findIndex(
			function(book){
				return book._id === action.payload;
			}
		);
		return {books:[...allBooksToDelete.slice(0, indexToDelete),...allBooksToDelete.slice(indexToDelete+1)
			]};
		break;

		case "UPDATE_BOOK":
		const allBooksToUpdate = [...state.books];
		const indexToUpdate = allBooksToUpdate.findIndex(function(book){
			return book._id === action.payload._id;
		});
		const newBook = {...allBooksToUpdate[indexToUpdate], ...action.payload};

		return {books:[...allBooksToUpdate.slice(0, indexToUpdate), newBook, ...allBooksToUpdate.slice(indexToUpdate+1)
			]};
		break;

	}

	return state;
}