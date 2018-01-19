"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Grid, Row, Col, Button, Carousel} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component{
	componentDidMount(){
		//dispatch an action
		this.props.getBooks();
	}
	render(){
		const listOfBooks = this.props.books.map(book=>{
			return(
				<Col xs={12} sm={6} md={4} key={book._id}>
					<BookItem
						_id = {book._id}
						title = {book.title}
						description = {book.description}
						images = {book.images}
						price = {book.price}
					/>
				</Col>
				);
		});
		return(
			<Grid >
			<Row>
				<Carousel>
					<Carousel.Item>
						<img width={900} height={300} alt="900x300" src="/images/home1.jpg" />
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img width={900} height={300} alt="900x300" src="/images/home2.jpg" />
						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</Row>
				<Row style={{marginTop: '15px'}}>
					{listOfBooks}
				</Row>
			</Grid>
		)
	}
}

function mapStateToSomeProps(state){
	return {
		books: state.books.books
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getBooks: getBooks
	}, dispatch);
}
//export default BooksList;
export default connect(mapStateToSomeProps, mapDispatchToProps)(BooksList);