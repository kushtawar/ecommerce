import { FaShoppingCart, FaUser } from 'react-icons/fa';

import {
  Navbar,
  Nav,
  Container,
  NavLink,
  NavDropdown,
  Badge,
} from 'react-bootstrap';
import React from 'react';
import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { UseSelector, useSelector } from 'react-redux';

const Header = () => {
  const { cartItems } = useSelector((statesss) => statesss.cart);
  console.log(cartItems);
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
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/cart">
                <NavLink className="d-none d-md-inline">
                  <div
                    style={{ position: 'relative', display: 'inline-block' }}
                  >
                    <FaShoppingCart />
                    {cartItems.length > 0 && (
                      <Badge
                        pill
                        style={{
                          color: 'orange',
                          font: 'large',
                          position: 'absolute',
                          top: -10,
                          right: -14,
                          fontSize: '0.7em',
                        }}
                      >
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </div>
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
