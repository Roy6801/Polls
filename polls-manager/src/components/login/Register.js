import { useState } from "react";
import Service from "../Service";
import PropTypes from "prop-types";
import "../stylesheets/Register.css";

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
        password: Service.crypt(password, true),
        firstName: Service.crypt(firstName, true),
        lastName: Service.crypt(lastName, true),
        email: Service.crypt(email, true),
        mobileNo: Service.crypt(mobileNo, true),
        userToken: null,
      };

      Service.register(user).then((resp) => {
        if (resp.data.response === 1) {
          user = {
            userName: userName,
            password: Service.crypt(password, true),
          };
          Service.login(user).then((resp) => {
            if (
              resp.data.response !== 0 &&
              resp.data.response !== undefined &&
              resp.data.response !== null
            ) {
              window.localStorage.setItem(
                "polls-manager-system-G22-user",
                user.userName
              );
              setToken(resp.data.response);
            } else {
              alert("Some Error Occurred!!");
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
            type="button"
            className="btn btn-success"
            style={{ flexGrow: 1, margin: "20px" }}
            onClick={(e) => {
              window.location.reload();
            }}
          >
            <b>Back</b>
          </button>
          <button
            type="submit"
            className="btn btn-success"
            style={{ flexGrow: 1, margin: "20px" }}
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
