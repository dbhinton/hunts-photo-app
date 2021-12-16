import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Button,
  Form,
  Row,
  Col,
  ListGroup,
  Container,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { createOrder } from "../../actions/orderActions";

export default function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useSelector((statet) => statet.cart);
  const { shippingAddress, cartItems } = cart;
  const { address, postalCode, city, state, country } = shippingAddress;

  //Calculate prices
  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 5 : 10;
  cart.taxPrice = Number(0.05 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  if (!cart.shippingAddress.address) {
    navigate('/shipping')
  } else if (!cart.paymentMethod) {
    navigate('/payment')
  }

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [navigate, success])

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <>
      <Container className="mt-5">
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

              <ListGroup.Item>
                <h2>Order Items</h2>
                {cartItems.length === 0 ? (
                  <ErrorMessage>Your Cart is Empty</ErrorMessage>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>
                            <Link to={`product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col>
                            {item.qty} X ${item.price} = {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <Col>Total</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="col-12"
                    size="lg"
                    disabled={cartItems === 0}
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
