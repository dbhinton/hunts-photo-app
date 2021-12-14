import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
 
const PaymentMethod = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingDetails, setShippingDetails] = useState({
    address: shippingAddress.address,
    postalCode: shippingAddress.postalCode,
    city: shippingAddress.city,
    state: shippingAddress.state,
    country: shippingAddress.country,
  });
  const { address, postalCode, city, state, country } = shippingDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("button");
    dispatch(
      saveShippingAddress({ address, city, postalCode, state, country })
    );
    navigate("/payment");
  };

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={handleChange}
            name="address"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={handleChange}
            name="city"
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="state" className="my-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={handleChange}
            name="state"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={handleChange}
            name="postalCode"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={handleChange}
            name="country"
            required
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="px-5 py-3">
        Continue
      </Button>
      </Form>

    </FormContainer>
  );
};
export default PaymentMethod;
