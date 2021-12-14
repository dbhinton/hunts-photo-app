import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function FormContainer({ children }) {
  return (
    <Container className='mt-5'>
      <Row>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}
