import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

// Required scripts
import { useAuthContext } from '../background/auth';

const Navigation = () => {
  const { logOutGoogle } = useAuthContext();

  return (
    <Navbar expand='lg' bg='light'>
      <Container>
        <Navbar.Brand href='/home'>Chat App</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => { logOutGoogle(); }} >
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;