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
      <div
        className="mainDiv"
        style={{
          background:
            "linear-gradient(140deg, rgba(248,222,126,1) 39%, rgba(255,253,208,1) 100%)",
        }}
      >
        <h1>Success!!</h1>
      </div>
    );
  } else {
    return (
      <div
        className="mainDiv"
        style={{
          background:
            "background: linear-gradient(140deg, rgba(139,0,0,1) 0%, rgba(220,20,60,1) 59%, rgba(250,128,114,1) 99%)",
        }}
      >
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
