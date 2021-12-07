import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
    return (
<Navbar bg="light" expand="lg" collapseOnSelect>
  <Container>
    <Navbar.Brand href="/">Hunt's Photo</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link href="/cart"><i class="fas fa-shopping-cart"></i> Cart</Nav.Link>
        <Nav.Link href="/login"><i class="fas fa-user"></i> Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}
