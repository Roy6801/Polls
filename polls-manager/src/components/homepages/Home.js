import React, { Component } from "react";
// import {  Link } from "react-router-dom";
// import { Button } from "reactstrap";
import Navbar from "./Navbar";
import Login from "../login/Login";

class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <br/>
        <br />
        <br />
        <br />
        <div
          className="container"
          style={{ float: "right", alignItems: "center", width: "80%" }}
        >
          <br />

          <Login />
        </div>
        {/* <Link to="/homepages/UserRegistartion" className="btn btn-outline-light">
        <Button color="info" style={{marginLeft:"120px"}} outline>
          User Registration
          </Button>
          </Link>  */}
      </div>
    );
  }
}

export default Home;
