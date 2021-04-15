import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../stylesheets/Register.css";

const PollWait = ({ pollInfo, reg }) => {

  const countDown = (time) => {
    
  };

  if (reg) {
    return (
      <div className="mainDiv">
        <h1>You have Registered already. Wait for Poll to start</h1>
      </div>
    );
  } else {
    return (
      <div className="mainDiv">
        <h1>
          You have Participated already. Come back when Poll ends for Results
        </h1>
      </div>
    );
  }
};

PollWait.propTypes = {
  pollInfo: PropTypes.object.isRequired,
  reg: PropTypes.bool.isRequired,
};

export default PollWait;
