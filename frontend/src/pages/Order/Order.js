import React, { useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
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
import { getOrderDetails } from "../../actions/orderActions";

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const orderId = params.id

  const orderDetails = useSelector(state => state.orderCreate)
  const { order, loading, error } = orderDetails
  const { shippingAddress, orderItems } = order;
  const { address, postalCode, city, state, country } = shippingAddress;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
      if(!order || order._id!==orderId){
        dispatch(getOrderDetails(orderId))
      }
  }, [dispatch, order, orderId])

  return loading ? <Loader /> : error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : 
  <>
  <Container className="mt-4">
  <h1>Order Successful!</h1>
  <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <strong>Name: </strong> {order.user.name}
                <p>
                  <strong>Address: </strong>
                  {address}, {city}, {state}, {postalCode}, {country},
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong> <span>{order.paymentMethod}</span>
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {orderItems.length === 0 ? (
                  <ErrorMessage>Your Order is Empty</ErrorMessage>
                ) : (
                  <ListGroup variant="flush">
                    {orderItems.map((item, index) => (
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
                    <Col>Items Price</Col>
                    <Col>${order.orderItems.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        </Container>
  </>
}
