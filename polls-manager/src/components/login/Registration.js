import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Service from "../Service";
// import axios from "axios";

class Registration extends Component {
  state = {
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    mobileNo: "",
    redirect: false,

    userNameError: "",
    firstNameError: "",
    lastNameError: "",
    passwordError: "",
    emailError: "",
    mobileNoError: "",
    confirmPasswordError: "",
  };

  //validation*/

  validate = () => {
    let flag = true;

    //====================
    if (this.state.userName === "") {
      flag = false;
      this.setState({ userName: "UserName Is Required" });
    } else {
      this.setState({ userNameError: "" });
    }
    if (this.state.firstName === "") {
      flag = false;
      this.setState({ firstNameError: "First Name is Required" });
    } else if (!this.state.firstName.match(/^[a-zA-Z ]*$/)) {
      flag = false;
      this.setState({
        firstNameError: "Please Enter Alphabet characters only.",
      });
    } else {
      this.setState({ firstNameError: "" });
    }

    if (this.state.password === "") {
      flag = false;
      this.setState({ passwordError: "Password is Required" });
    } else if (
      !this.state.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      flag = false;
      this.setState({
        passwordError: "Please enter secure and strong password.",
      });
    } else {
      this.setState({ passwordError: "" });
    }
    if (this.state.confirmPassword !== this.state.password) {
      flag = false;
      this.setState({ confirmPasswordError: "Password must be same" });
    }

    //=================

    if (this.state.email === "") {
      flag = false;
      this.setState({ emailError: "Email Id Is Required" });
    } else {
      this.setState({ emailError: "" });
    }

    //=================

    if (this.state.mobileNo === "") {
      flag = false;
      this.setState({ mobileNoError: "Mobile No Is Required" });
    } else if (!this.state.mobileNo.match(/^[0-9]{10}$/)) {
      flag = false;
      this.setState({ mobileNoError: "Please Enter Valid Mobile No" });
    } else {
      this.setState({ mobileNoError: "" });
    }

    //====================

    return flag;
  };

  //Submit*//

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      userNameError: "",
      firstNameError: "",
      lastNameError: "",
      passwordError: "",
      confirmPassword: "",
      emailError: "",
      mobileNoError: "",
    });

    let isValid = this.validate();
    if (!isValid) {
      return false;
    }

    let user = {
      userName: this.state.userName,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobileNo: this.state.mobileNo,
    };

    Service.register(user).then((resp) => {
      if (resp.data.response === 1) {
        this.setState({ redirect: true });
      } else {
        alert("Try another Username!!");
      }
    });
  };

  //**render*//

  render() {
    const {  redirect  } = this.state;

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
        <form onSubmit={this.handleSubmit}>
          {/* <div class="text-center mt-2" align="center" style={{marginLeft:"50px"}}><br></br>
              <h4>Enter your details:</h4>
              </div> */}
          <br />
          <br />
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.userNameError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            <label>
              <b>
                User Name : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
              </b>{" "}
            </label>
            <input
              style={{ borderRadius: "90px" }}
              type="text"
              className="form-control"
              id="userName"
              placeholder="Enter User Name"
              value={this.state.userName}
              onChange={(event) =>
                this.setState({ userName: event.target.value })
              }
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.firstNameError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            <label>
              <b>
                First Name : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
              </b>{" "}
            </label>
            <input
              style={{ borderRadius: "90px" }}
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter First Name"
              value={this.state.firstName}
              onChange={(event) =>
                this.setState({ firstName: event.target.value })
              }
            />
          </div>
          <br />
          {/* <div className="alert-danger"style={{marginLeft:"550px",marginRight:"600px"}}>{this.state.lastNameError}</div> */}
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.lastNameError}</div><br/><br/> */}
            <label>
              <b>
                Last Name : &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                &nbsp;
              </b>
            </label>
            <input
              style={{ borderRadius: "60px" }}
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter Last Name"
              value={this.state.lastName}
              onChange={(event) =>
                this.setState({ lastName: event.target.value })
              }
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.passwordError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.passwordError}</div><br/><br/> */}
            <label>
              <b>
                Password : &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </b>{" "}
            </label>
            <input
              style={{ borderRadius: "60px" }}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your Password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.confirmPasswordError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.confirmPasswordError}</div><br/><br/> */}
            <label>
              <b> Confirm Password : &nbsp; </b>{" "}
            </label>
            <input
              style={{ borderRadius: "40px" }}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your Password"
              value={this.state.confirmPassword}
              onChange={(event) =>
                this.setState({ confirmPassword: event.target.value })
              }
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.emailError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.emailError}</div> */}
            <label>
              <b>
                Email : &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </b>
            </label>
            <input
              style={{ borderRadius: "60px" }}
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your Email Id"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </div>
          <br />
          <div
            className="alert-danger"
            style={{ marginLeft: "550px", marginRight: "600px" }}
          >
            {this.state.mobileNoError}
          </div>
          <div
            className="form-inline"
            align="center"
            style={{ marginLeft: "400px" }}
          >
            {/* <div className="alert-danger">{this.state.mobileNoError}</div><br/><br/> */}
            <label>
              <b>
                Mobile No : &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
              </b>{" "}
            </label>
            <input
              style={{ borderRadius: "60px" }}
              type="text"
              className="form-control"
              id="mobileNo"
              placeholder="Enter your mobile No"
              value={this.state.mobileNo}
              onChange={(event) =>
                this.setState({ mobileNo: event.target.value })
              }
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginLeft: "560px" }}
          >
            <b>Save</b>
          </button>
        </form>
      </div>
    );
  }
}
export default Registration;
