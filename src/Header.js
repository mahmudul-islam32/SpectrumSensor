import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { Navbar, Nav as BootstrapNav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand>
          <Link to="/">SpectrumStatus</Link>
        </Navbar.Brand>

        {/* Toggle button for smaller screens */}
        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav" className="justify-content-end">
          <BootstrapNav>
            <Nav />
          </BootstrapNav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
