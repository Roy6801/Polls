import { useState } from "react";
import Proptypes from "prop-types";
import Service from "../Service";
import Success from "../Success";

const PollReg = ({ pollURL, vC }) => {
  const userName = window.localStorage.getItem("polls-manager-system-G22-user");

  const [success, setSuccess] = useState();

  const handleClick = (e) => {
    const user = {
      userName: userName,
      pollURL: pollURL,
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
      <div>
        <h1>Register for Poll</h1>
        <label>
          Register for this Poll? Your Username : {userName} will be registerd
        </label>
        <h3>Poll_ID : {pollURL}</h3>
        <h4>Verification_ID : {vC}</h4>
        <button type="submit" onClick={handleClick}>
          Register
        </button>
      </div>
    );
  }
};

PollReg.propTypes = {
  pollURL: Proptypes.string.isRequired,
  vC: Proptypes.string.isRequired,
};

export default PollReg;
