"use strict"
import React from 'react';
import {Image, Well, Col, Button, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends React.Component{
	constructor(){
		super();
		this.state = {
			isClicked: false
		};
	}

	onReadMore(){
		this.setState({isClicked: true});
	}

	handleCart(){
		const cart = [...this.props.cart, {
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			images: this.props.images,
			price: this.props.price,
			qty: 1
		}];
		if(this.props.cart.length > 0){
			let _id = this.props._id;
			let indexItem = this.props.cart.findIndex(function(cartItem){
				return cartItem._id === _id;
			});

			if(indexItem === -1){
				this.props.addToCart(cart);
			}else{
				this.props.updateCart(_id, 1, this.props.cart);
			}

		}else{
			this.props.addToCart(cart);
		}
	}

	render(){
		return(
			<Well bsStyle='small'>
				<Row>
					<Col xs={12} sm={4}>
						<Image src={this.props.images} responsive />
					</Col>
					<Col xs={6} sm={8}>
						<h6>{this.props.title}</h6>
						<p>{
							(this.props.description.length > 50 && this.state.isClicked === false)
							?(this.props.description.substring(0, 50))
							:(this.props.description)
						}
						<button className="link" onClick={this.onReadMore.bind(this)}>
						{
							(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)
							?('...read more')
							:('')
						}
						</button>
						</p>
						<h6>{this.props.price} UAH</h6>
						<Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
					</Col>
				</Row>
			</Well>
		);
	}
}

function mapStateToProps(state){
	return({
		cart: state.cart.cart
	});
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addToCart: addToCart,
		updateCart: updateCart
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);