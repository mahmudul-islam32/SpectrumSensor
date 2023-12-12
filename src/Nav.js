import React from "react";
import { NavLink } from "react-router-dom";
import { Nav as BootstrapNav } from "react-bootstrap";

function Nav() {
  return (
    <BootstrapNav>
      <BootstrapNav.Item>
        <NavLink className="nav-link" to="/">
          Sensor Data
        </NavLink>
      </BootstrapNav.Item>
      <BootstrapNav.Item>
        <NavLink className="nav-link" to="/live">
          Live Sensor Data
        </NavLink>
      </BootstrapNav.Item>
    </BootstrapNav>
  );
}

export default Nav;
