import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { addToCart, removeFromCart } from "../../actions/cartActions";

export default function Cart() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  const checkoutHandler = () => {
      console.log('checkout')
      navigate(`/login?/redirect=/shipping`)
  }

  return (
    <Container>
      <Row style={{ marginTop: "6rem" }}>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <ErrorMessage>
              Your Cart Is Empty,{" "}
              <Link to="/" style={{ color: "green" }}>
                Go Back
              </Link>
            </ErrorMessage>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="p-5 px-3">
                    <Col className="mx-3" md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col className="mx-5 px-5" md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ color: "grey" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            Qty: {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  )
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="col-12"
                  disabled={cartItems === 0}
                  onClick={checkoutHandler}
                >Proceed to Checkout</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
