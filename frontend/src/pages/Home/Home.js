import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

export default function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Container>
        <h1>Latest Products</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : 
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={6} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        }
      </Container>
    </>
  );
}
