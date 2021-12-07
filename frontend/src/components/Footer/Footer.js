import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './FooterStyles.css'

export default function Footer() {
    return (

      <Container className="footer">
        <Row>
          <Col className="text-center py-3">
      Copyright &copy Hunt's Photo and Video 2021
          </Col>
        </Row>
      </Container>
    )
}
