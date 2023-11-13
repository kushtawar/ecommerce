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
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation(); //RTK Mutation returns a tuplr

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      // dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="headerBackground">
      <Navbar variant="dark" expand="md" collapseOnSelect>
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
                  <FaShoppingCart /> {/* Cart */}
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="orange"
                      style={{
                        marginLeft: '0px',
                        fontSize: '0.5em',
                        position: 'relative',
                        top: -9,
                        right: -1,
                        backgroundColor: 'orange',
                      }}
                    >
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/cart">
                <NavLink className="d-none d-md-inline">
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                    }}
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
              {userInfo ? (
                <>
                  <NavDropdown
                    // Add a custom class to the NavDropdown
                    title={userInfo.name}
                    id="username"
                    className="headerRightMargin"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="custom-dropdown-item">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      className="custom-dropdown-item"
                      onClick={logoutHandler}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
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
                </>
              )}
              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  className="headerRightMargin"
                >
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item className="custom-dropdown-item">
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item className="custom-dropdown-item">
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item className="custom-dropdown-item">
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/settings">
                    <NavDropdown.Item className="custom-dropdown-item">
                      Settings
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
