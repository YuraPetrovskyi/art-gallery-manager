import React from "react";
import { Navbar, Container } from "react-bootstrap";

const AppNavbar: React.FC = () => {
  return (
    <Navbar className="bg-white border-bottom shadow-sm">
      <Container className="m-0">
        <Navbar.Brand href="#" className="d-flex">
          <img src="src/img/palete.png" alt="art icon of logotype" width="30" height="30" className="me-2" />
          <span className="fs-4 fw-bold text-dark">ArtGalleryManager</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
