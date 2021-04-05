import { useState } from "react";
import PropTypes from "prop-types";
import Service from "../Service";

const Login = ({ setToken }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div>
      <h1>Login Required!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
