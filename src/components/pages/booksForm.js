"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import axios from 'axios';
import {
	MenuItem,
	InputGroup, 
	DropdownButton, 
	Image, 
	Col, 
	Row, 
	Well, 
	Panel, 
	FormControl, 
	FormGroup, 
	ControlLabel, 
	Button
} from 'react-bootstrap';
import {addBook, deleteBook, getBooks, resetButton} from '../../actions/booksActions';

class BooksForm extends React.Component{
	constructor(){
		super();
		this.state = {
			images: [{}],
			img: ''
		}
	}

	componentDidMount(){
		this.props.getBooks();
		axios.get('/api/images')
		.then((res)=>{
			console.log(res.data);
			this.setState({images: res.data})
		})
		.catch((err)=>{
			this.setState(
				{
					images:'error loading images from the server',
					img: ''
				})
		});
	}

	onAddBook(){
		const book = [{
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			images: findDOMNode(this.refs.image).value,
			price: findDOMNode(this.refs.price).value
		}];
		this.props.addBook(book);
	}

	resetForm(){
		this.props.resetButton();
		findDOMNode(this.refs.title).value = '';
		findDOMNode(this.refs.description).value = '';
		findDOMNode(this.refs.image).value = '';
		findDOMNode(this.refs.price).value = '';
		this.setState({img: ''})
	}

	onDeleteBook(){
		let bookId = findDOMNode(this.refs.delete).value;
		this.props.deleteBook(bookId);
	}

	handleSelect(imageName){
		this.setState({
			img: '/images/'+imageName
		})
	}

	render(){
		const booksList = this.props.books.map(function(book){
			return(
				<option key={book._id}>{book._id}</option>
			);
		});

		const imgList = this.state.images.map(function(image, i){
			return(
				<MenuItem 
				key={i} 
				eventKey={image.name}
				onClick={this.handleSelect.bind(this, image.name)}
				>
					{image.name}
				</MenuItem>
			);
		}, this);

		return(
			<Well>
				<Row>
					<Col xs={12} sm={6}>
						<Panel>
							<InputGroup>
								<FormControl type="text" ref="image" value={this.state.img} />
								<DropdownButton
									componentClass={InputGroup.Button}
									id="input-dropdown-addon"
									title="Select an image"
									bsStyle="primary">
									{imgList}
								</DropdownButton>
							</InputGroup>
							<Image src={this.state.img} responsive />
						</Panel>
					</Col>
					<Col xs={12} sm={6}>
						<Panel>
							<FormGroup controlId="title" validationState={this.props.validation}>
								<ControlLabel>Title</ControlLabel>
									<FormControl 
										type="text"
										placeholder="Enter Title"
										ref="title"
									/>
									<FormControl.Feedback />
							</FormGroup>
							<FormGroup controlId="description" validationState={this.props.validation}>
								<ControlLabel>Description</ControlLabel>
									<FormControl 
										type="text"
										placeholder="Enter Description"
										ref="description"
									/>
									<FormControl.Feedback />
							</FormGroup>
							<FormGroup controlId="price" validationState={this.props.validation}>
								<ControlLabel>Price</ControlLabel>
									<FormControl 
										type="text"
										placeholder="Enter Price"
										ref="price"
									/>
									<FormControl.Feedback />
							</FormGroup>
							<Button 
								onClick={(!this.props.msg)?(this.onAddBook.bind(this)):(this.resetForm.bind(this))}
								bsStyle={
									(!this.props.msg)?('primary'):(this.props.style)
								}
								>{(!this.props.msg)?('Save book'):(this.props.msg)}</Button>
						</Panel>
						<Panel style={{marginTop: '25px'}}>
							<FormGroup controlId="formControlSelect">
								<ControlLabel>
									Select a book to delete.
								</ControlLabel>
								<FormControl 
									ref="delete"
									componentClass="select"
									placeholder="select">
									<option value="select">select a book</option>
									{booksList}
								</FormControl>
							</FormGroup>
							<Button onClick={this.onDeleteBook.bind(this)} bsStyle="danger">Delete book</Button>
						</Panel>
					</Col>
				</Row>
			</Well>
		);
	}
}

function mapStateToProps(state){
	return {
		books: state.books.books,
		msg: state.books.msg,
		style: state.books.style,
		validation: state.books.validation
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addBook: addBook,
		deleteBook: deleteBook,
		getBooks: getBooks,
		resetButton: resetButton
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);