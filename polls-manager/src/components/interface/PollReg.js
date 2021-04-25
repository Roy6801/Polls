import { useState } from "react";
import Proptypes from "prop-types";
import Service from "../Service";
import Success from "../Success";
import "../stylesheets/Register.css";

const PollReg = ({ pollInfo, vC }) => {
  const userName = window.localStorage.getItem("polls-manager-system-G22-user");
  const [success, setSuccess] = useState();

  const handleClick = (e) => {
    const user = {
      userName: userName,
      pollURL: pollInfo.poll_Id,
      verificationId: vC,
    };
    Service.registerForPoll(user).then((resp) => {
      if (resp.data.response === 1) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    });
  };

  if (success === true) {
    return <Success success={success} />;
  } else if (success === false) {
    return <Success success={success} />;
  } else {
    return (
      <div className="mainDiv" style={{background: "linear-gradient(140deg, rgba(248,222,126,1) 44%, rgba(252,244,163,1) 83%)"}}>
        <h1>Register for Poll</h1>
        <h3>Your,</h3>
        <h2>Username : {userName}</h2>
        <h2>Verification_ID : {vC}</h2>
        <h3>Will be Registered</h3>
        <h5>Poll_ID : {pollInfo.poll_Id}</h5>
        <button type="submit" className="btn btn-success" onClick={handleClick}>
          Register
        </button>
      </div>
    );
  }
};

PollReg.propTypes = {
  pollInfo: Proptypes.object.isRequired,
  vC: Proptypes.string.isRequired,
};

export default PollReg;
