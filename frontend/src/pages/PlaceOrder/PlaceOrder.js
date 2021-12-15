import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Row, Col, ListGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";

export default function PlaceOrder() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { address, postalCode, city, state, country } = shippingAddress;


  return (
    <>
    <Container className='mt-5'>
    <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {address}, {city}, {state}, {postalCode}, {country},
              </p>

              
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> <span>{cart.paymentMethod}</span> 
                
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>

    </>
  );
}
