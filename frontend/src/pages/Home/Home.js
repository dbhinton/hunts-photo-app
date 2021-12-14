import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loader from '../../components/Loader/Loader'

export default function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>

      <Container className='mt-5'>
        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage variant='danger'>{error}</ErrorMessage>
        ) : (
          <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={6} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        )
        
        }
      </Container>
    </>
  );
}
