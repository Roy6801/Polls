import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import Home from './Home';
import { NavLink, Link } from "react-router-dom";
import Service from "../Service";
//import { Button } from "reactstrap";
//import Navbar from "../layout/Navbar";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      userNameError: "",
      passwordError: "",
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleBlur(event) {
    const { name } = event.target;
    this.validateField(name);
    return;
  }

  login = (event) => {
    event.preventDefault();
    this.setState({
      userNameError: "",
      passwordError: "",
    });

    if (!this.validateUserName() || !this.validatePassword()) {
      alert("Login Error! Check Username and Password!!");
    }

    let user = {
      userName: this.state.userName,
      password: this.state.password,
    };
    
    Service.login(user).then((resp) => {
      if (resp.data.response === 1) {
        this.setState({ redirect: true });
      } else {
        alert("Check Username or Password!!");
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validateField(name) {
    let isValid = false;
  }

  validateUserName() {
    let flag = true;
    const value = this.state.userName;
    if (value === "") {
      flag = false;
      this.setState({ userNameError: "User Name is required" });
    }
    return flag;
  }

  validatePassword() {
    let flag = true;
    const value = this.state.password;
    if (value === "") {
      flag = false;
      this.setState({ passwordError: "Password is required" });
    }
    return flag;
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          exact
          to={{
            pathname: "/dashboard",
            state: { userName: this.state.userName },
          }}
        />
      );
    }

    return (
      <div>
        <div className="col-md-6 my-auto">
          <div className="row">
            <div className="col-sm-11 signin text-center">
              <form>
                <div
                  className="text-center mt-2"
                  align="center"
                  style={{ marginLeft: "160px" }}
                >
                  <div className="alert-danger">{this.state.userNameError}</div>
                  <div className="form-inline" align="center">
                    <label>
                      <b>UserName &nbsp; &nbsp;</b>
                    </label>
                    <input
                      style={{ borderRadius: "40px" }}
                      type="text"
                      placeholder="User Name"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      autoComplete="off"
                      className="form-control mt-2"
                    />
                  </div>
                  <div className="alert-danger">{this.state.passwordError}</div>
                  <div className="form-inline" align="center">
                    <label>
                      <b> Password &nbsp; &nbsp;&nbsp;</b>{" "}
                    </label>
                    <input
                      style={{ borderRadius: "40px" }}
                      placeholder="Password"
                      type="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      autoComplete="off"
                      className="form-control mt-2"
                    />
                  </div>

                  <br></br>
                  <button
                    className="btn btn-dark mt-3 mr-5 xs "
                    onClick={this.login}
                  >
                    Login
                  </button>
                  <button className="btn btn-dark mt-3 mr-5 xs ">
                    <Link to="/Register">Register </Link>
                  </button>
                  <br></br>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
