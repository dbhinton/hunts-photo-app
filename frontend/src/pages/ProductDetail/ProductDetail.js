import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import Rating from "../../components/Rating/Rating";
import axios from "axios";


export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState({})

  useEffect(() => {
      const fetchProduct = async () => {
          const { data } = await axios.get(`/api/products/${params.id}`)
          setProduct(data)
      }
      fetchProduct()
  }, [params]); 

  console.log(params, "this is params");
  console.log(product, "this is product");
  return (
    <Container style={{ marginTop: "6rem" }}>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: {product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </Col>
              </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Price:</Col>
                        <Col>
                        <strong>${product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button className='btn-block' type='button' disabled={product.countInStock===0}>
                        Add To Cart
                    </Button>
                </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
