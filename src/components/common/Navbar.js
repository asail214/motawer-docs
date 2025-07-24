import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navbar = () => {
  return (
    <BootstrapNavbar 
      expand="lg" 
      className="custom-navbar" 
      fixed="top"
      variant="dark"
    >
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand className="d-flex align-items-center">
            {/* Logo Image */}
            <img 
              src="/logo-dark.png" 
              alt="مطور" 
              style={{
                height: '40px',
                width: 'auto',
                marginLeft: '0.5rem'
              }}
            />
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>الرئيسية</Nav.Link>
            </LinkContainer>
            
            <NavDropdown title="التعلم" id="learning-dropdown">
              <LinkContainer to="/frontend-basics">
                <NavDropdown.Item>أساسيات تطوير الواجهات</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/react-introduction">
                <NavDropdown.Item>مقدمة عن React</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/environment-setup">
                <NavDropdown.Item>إعداد بيئة التطوير</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/core-concepts">
                <NavDropdown.Item>المفاهيم الأساسية</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/todo-project">
                <NavDropdown.Item>مشروع قائمة المهام</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/next-steps">
                <NavDropdown.Item>الخطوات التالية</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            
            <LinkContainer to="/contact">
              <Nav.Link>تواصل معي</Nav.Link>
            </LinkContainer>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;