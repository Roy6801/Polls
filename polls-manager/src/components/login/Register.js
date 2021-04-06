import { useState } from "react";
import Service from "../Service";
import PropTypes from "prop-types";
import "../stylesheets/Register.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = ({ setToken }) => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const validate = () => {
    var passReg = {
      upper: /[A-Z]/,
      lower: /[a-z]/,
      number: /[0-9]/,
      space: /\s/,
      min8: /.{8,}/,
    };
    if (
      !(
        passReg.upper.test(password) &&
        passReg.lower.test(password) &&
        passReg.number.test(password) &&
        !passReg.space.test(password) &&
        passReg.min8.test(password)
      )
    ) {
      alert(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number Required!! No spaces allowed!!"
      );
      return 0;
    } else if (cnfPassword !== password) {
      alert("Passwords don't match!!");
      return 0;
    } else if (!email.match(/.+@.+\..+/)) {
      alert("Invalid Email Format!!");
      return 0;
    } else if (!mobileNo.match(/^[0-9]{10}$/)) {
      alert("Enter Valid Mobile No!!");
      return 0;
    } else {
      return 1;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() !== 0) {
      var user = {
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        userToken: null,
      };
      console.log(user);

      Service.register(user).then((resp) => {
        if (resp.data.response === 1) {
          user = {
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
            }
          });
        } else {
          alert("Error Occurred!! Retry OR Try another Username..");
        }
      });
    }
  };

  return (
    <div className="mainDiv">
      <form onSubmit={handleSubmit}>
        <div className="subDiv">
          <div className="label-control">
            <b>Username</b>
          </div>
          <input
            type="text"
            id="userName"
            placeholder="Enter Username"
            required
            onChange={(e) => setUserName(e.target.value)}
            className="input-control"
          />
        </div>
        <div className="subDiv">
          <div className="label-control">
            <b>First Name</b>
          </div>
          <input
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
            className="input-control"
          />
        </div>

        <div className="subDiv">
          <div className="label-control">
            <b>Last Name</b>
          </div>
          <input
            type="text"
            id="lastName"
            placeholder="Enter Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
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
          <div className="label-control">
            <b>Confirm Password</b>
          </div>
          <input
            type="password"
            id="cnfPassword"
            placeholder="Enter Password"
            required
            onChange={(e) => setCnfPassword(e.target.value)}
            className="input-control"
          />
        </div>

        <div className="subDiv">
          <div className="label-control">
            <b>Email</b>
          </div>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email Id"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="input-control"
          />
        </div>

        <div className="subDiv">
          <div className="label-control">
            <b>Mobile No.</b>
          </div>
          <input
            type="text"
            id="mobileNo"
            placeholder="Enter your Mobile No"
            required
            onChange={(e) => setMobileNo(e.target.value)}
            className="input-control"
          />
        </div>
        <div className="subDiv">
          <button
            type="submit"
            className="btn btn-success"
            style={{ flexGrow: 1, margin: "30px" }}
          >
            <b>Save</b>
          </button>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Register;