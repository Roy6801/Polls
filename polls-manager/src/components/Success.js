import { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import "./stylesheets/Register.css";

const Success = ({ success }) => {
  const [home, setHome] = useState(false);

  const handleClick = (e) => {
    if (success) {
      setHome(true);
    } else {
      window.location.reload();
    }
  };

  if (home) {
    return <Redirect exact to="/" />;
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
        <button type="submit" className="btn btn-danger" onClick={handleClick}>
          Reload
        </button>
      </div>
    );
  }
};

Success.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Success;
