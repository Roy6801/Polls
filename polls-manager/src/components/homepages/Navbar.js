import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
            size="500"
          >
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-brand" exact to="/">
                    Polls Manager
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/about">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/contact">
                    Contacts Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
    );
  }
}

export default Navbar;
