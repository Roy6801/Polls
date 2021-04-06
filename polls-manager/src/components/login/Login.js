import React, { useState } from "react";
import PropTypes from "prop-types";
import Service from "../Service";
import Register from "./Register";
import "../stylesheets/Register.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setToken }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [reg, setReg] = useState(false);

  const handleClick = () => {
    setReg(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      userName: userName,
      password: password,
    };

    Service.login(user).then((resp) => {
      if (
        resp.data.response !== 0 &&
        resp.data.response !== undefined &&
        resp.data.response !== null
      ) {
        console.log(resp.data.response);
        setToken(resp.data.response);
      } else {
        alert("Check Username or Password!!");
      }
    });
  };

  if (reg === false) {
    return (
      <div className="mainDiv">
        <form onSubmit={handleSubmit}>
          <div className="subDiv">
            <div className="label-control">
              <b>Username</b>
            </div>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              required
              onChange={(e) => setUserName(e.target.value)}
              className="input-control"
            />
          </div>
          <div className="subDiv">
            <div className="label-control">
              <b>Password</b>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="input-control"
            />
          </div>
          <div className="subDiv">
            <button
              type="submit"
              className="btn btn-success"
              style={{ flexGrow: 1, margin: "30px", marginBottom: "5px" }}
            >
              Login
            </button>
          </div>
        </form>
        <div className="subDiv">
          <button
            onClick={handleClick}
            className="btn btn-success"
            style={{ flexGrow: 1, margin: "30px", marginTop: "5px" }}
          >
            Register
          </button>
        </div>
      </div>
    );
  } else {
    return <Register setToken={setToken} />;
  }
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
