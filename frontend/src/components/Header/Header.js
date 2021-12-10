import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" collapseOnSelect fixed="top" >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Hunt's Photo</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/cart">
              <i class="fas fa-shopping-cart"></i> Cart
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              <i class="fas fa-user"></i> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
