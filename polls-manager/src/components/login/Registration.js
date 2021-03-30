import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Service from "../Service";
import "../stylesheets/Registration.css"
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
      <div className="mainDiv">
        
  
        
      </div>
    );
  }
}
export default Registration;
