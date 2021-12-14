import React, { useEffect, useState } from "react";
import {
  Link,
  useParams,
  Redirect,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { register } from "../../actions/userActions";

const Register = () => {
  const [credentials, setCredentials] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
  });
  const [message, setMessage] = useState(null)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister= useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(credentials.password !== credentials.confirmPassword){
        setMessage('Passwords don\'t match')
    }else{
        dispatch(register(credentials.name, credentials.email, credentials.password))
    }
  };

  const handleChange = (e) => {
      setCredentials({
          ...credentials,
          [e.target.name]: e.target.value
      })
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={credentials.name}
            onChange={handleChange}
            name="name"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={handleChange}
            name="email"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleChange}
            name="password"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Passwrod"
            value={credentials.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          ></Form.Control>
        </Form.Group>
        

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account Already?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
