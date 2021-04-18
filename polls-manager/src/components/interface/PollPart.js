import { useState } from "react";
import Proptypes from "prop-types";
import Service from "../Service";
import Success from "../Success";
import "../stylesheets/Register.css";

const PollPart = ({ pollInfo, vC }) => {
  const userName = window.localStorage.getItem("polls-manager-system-G22-user");
  const poll_Id = pollInfo.poll_Id;

  const [submit, setSubmit] = useState(false);
  const [options, setOptions] = useState("$$$NULL$$$");
  var radio;
  const [check, setCheck] = useState([]);

  if (options === "$$$NULL$$$") {
    Service.getPollOptions(pollInfo.poll_Id).then((resp) => {
      if (resp.data !== 0) {
        setOptions(resp.data);
      }
    });
  }

  const handleSubmit = (e) => {
    const answer = {
      verificationId: vC,
      ans: pollInfo.radio === 1 ? radio : check,
    };

    Service.participateInPoll(
      poll_Id,
      userName,
      pollInfo.scheduled,
      pollInfo.radio,
      answer
    ).then((resp) => {
      if (resp.data.response === 1) {
        setSubmit(true);
      }
    });
  };

  const handleClick = (e, i) => {
    if (pollInfo.radio === 1) {
      radio = e.target.value;
      console.log(radio);
    } else {
      var values = [...check];
      if (check.includes(e.target.value)) {
        values[i - 1] = "$$$NULL$$$";
        setCheck(values);
      } else {
        values[i - 1] = e.target.value;
        setCheck(values);
      }
    }
  };

  const DisplayOptions = () => {
    if (options !== "$$$NULL$$$") {
      return (
        <div>
          {Object.keys(options).map((i) => {
            return (
              <div key={options[i]}>
                <input
                  type={pollInfo.radio === 1 ? "radio" : "checkbox"}
                  value={options[i]}
                  checked={
                    pollInfo.radio === 1 ? radio : check.includes(options[i])
                  }
                  name={pollInfo.pollName}
                  onChange={(e) => {
                    handleClick(e, i);
                  }}
                  onClick={(e) => {
                    handleClick(e, i);
                  }}
                />
                {" " + options[i]}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  if (submit) {
    return <Success success={true} />;
  }

  return (
    <div>
      <h1>Poll : {pollInfo.pollName}</h1>
      <DisplayOptions />
      <h1>{pollInfo.anonymity === 1 ? "Anonymous" : "Non-Anonymous"}</h1>
      <h1>{vC === null ? "Verification ID : " + vC : ""}</h1>
      <h1>Poll Admin : {pollInfo.adminUserName}</h1>
      <button
        type="click"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </button>
    </div>
  );
};

PollPart.propTypes = {
  pollInfo: Proptypes.object.isRequired,
  vC: Proptypes.string.isRequired,
};

export default PollPart;
