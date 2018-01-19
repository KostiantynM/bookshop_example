"use strict"
import React from 'react';
import {connect} from 'react-redux'; //smart component
import {bindActionCreators} from 'redux';
import {Modal, Panel, Well, Row, Col, Button, ButtonGroup, Label} from 'react-bootstrap';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';

class Cart extends React.Component{
	constructor(){
		super();
		this.state = {showModal: false};
	}
	
	componentDidMount(){
		this.props.getCart();
	}



	handleCloseModal(){
		this.setState({showModal: false});
	}
	handleOpenModal(){
		this.setState({showModal: true});
	}
	deleteHandler(_id){

		const indexToDelete = this.props.cart.findIndex(
			function(cartItem){
				return _id === cartItem._id;
			}
		);
		const cartAfterDelete = [...this.props.cart.slice(0, indexToDelete), ...this.props.cart.slice(indexToDelete+1)]
		this.props.deleteCartItem(cartAfterDelete);
	}

	onIncrement(_id){
		this.props.updateCart(_id, 1, this.props.cart);
	}

	onDecrement(_id, qty){
		if(qty > 1){
			this.props.updateCart(_id, -1, this.props.cart);
		}
		
	}

	render(){
		if(this.props.cart[0]){
			return this.renderCart();
		}else{
			return this.renderEmpty();
		}
	}

	renderEmpty(){
		return(<div></div>);
	}

	renderCart(){
		const cartItemsList = this.props.cart.map((cartItem)=>{
			return(
				<Panel key={cartItem._id}>
					<Row componentClass="h4">
						<Col xs={12} sm={4}>
							<h6>{cartItem.title}</h6><span>      </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>usd. {cartItem.price}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>qty. <Label bsStyle="success">{cartItem.qty}</Label></h6>
						</Col>
						<Col xs={6} sm={4}>
							<ButtonGroup style={{minWidth: '300px'}}>
								<Button onClick={this.onDecrement.bind(this, cartItem._id, cartItem.qty)} bsStyle="default" bsSize="small">-</Button>
								<Button onClick={this.onIncrement.bind(this, cartItem._id)}  bsStyle="default" bsSize="small">+</Button>
								<span>     </span>
								<Button onClick={this.deleteHandler.bind(this, cartItem._id)} bsStyle="danger" bsSize="small">DELETE</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>
			);
		}, this);

		return(
			<Panel bsStyle="primary">
				<Panel.Heading>
					<Panel.Title componentClass="h3">Cart</Panel.Title>
				</Panel.Heading>

				<Panel.Body >
					{cartItemsList}
				</Panel.Body>

				<Panel.Footer>
					<Row>
						<Col xs={6}>
							<h6>Total amount:{this.props.totalAmount} usd.</h6>
							<Button onClick={this.handleOpenModal.bind(this)} bsStyle="success" bsSize="small">PROCESS TO CHECKOUT</Button>
						</Col>
						<Col xs={6}>
							<Button bsStyle="primary" bsSize="small">CART DITAILS</Button>
						</Col>
					</Row>
				</Panel.Footer>
				<Modal show={this.state.showModal} onHide={this.handleCloseModal.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>Thank You!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h6>Your order has beeg saved.</h6>
						<p>You will recive the confirmation email.</p>
					</Modal.Body>
					<Modal.Footer>
						<Col xs={6}>
							<h6>Total amount:{this.props.totalAmount} usd.</h6>
						</Col>
						<Button onClick={this.handleCloseModal.bind(this)}>Close</Button>
					</Modal.Footer>
				</Modal>
			</Panel>
		);
	}
}

function mapStateToProps(state){
	return{
		cart: state.cart.cart,
		totalAmount: state.cart.totalAmount
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		deleteCartItem: deleteCartItem,
		updateCart: updateCart,
		getCart: getCart
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);