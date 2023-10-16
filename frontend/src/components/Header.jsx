import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap';
import React from 'react';
import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="pic" className="rounded-circle img-50x50" />
              Shop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <NavLink className="d-md-none">
                  <FaShoppingCart /> Cart
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/cart">
                <NavLink className="d-none d-md-inline">
                  <FaShoppingCart />
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavLink className="d-md-none">
                  <FaUser /> Sign In
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavLink href="/login" className="d-none d-md-block">
                  <FaUser />
                </NavLink>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
