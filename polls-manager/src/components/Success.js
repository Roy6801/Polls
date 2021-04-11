import { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/Register.css";

const Success = ({ success, reg, part }) => {
  const [home, setHome] = useState(false);

  const handleClick = (e) => {
    setHome(true);
  };

  if (home) {
    return <Redirect exact to="/about" />;
  }

  if (success) {
    return (
      <div className="mainDiv">
        <h1>Success!!</h1>
        <button type="submit" className="btn btn-success" onClick={handleClick}>
          Home
        </button>
      </div>
    );
  } else {
    return (
      <div className="mainDiv">
        <h1>Failed!!</h1>
      </div>
    );
  }
};

Success.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Success;
