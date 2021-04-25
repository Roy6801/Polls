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
        <div style={{ fontFamily: "Gerogia", fontSize: "1.5rem" }}>
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
    <div
      className="mainDiv"
      style={{
        background:
          "linear-gradient(140deg, rgba(248,222,126,1) 39%, rgba(255,253,208,1) 100%)",
      }}
    >
      <h1 style={{ fontFamily: "Verdana" }}>Poll : {pollInfo.pollName}</h1>
      <DisplayOptions />
      <h4 style={{ fontFamily: "Lucida Console" }}>
        {pollInfo.anonymity === 1 ? "Anonymous" : "Non-Anonymous"}
      </h4>
      <h5 style={{ fontFamily: "Lucida Console" }}>
        {vC === null ? "Verification ID : " + vC : ""}
      </h5>
      <h4 style={{ fontFamily: "Lucida Console" }}>
        Poll Admin : {pollInfo.adminUserName}
      </h4>
      <button
        type="click"
        className="btn button-style"
        style={{
          backgroundColor: "green",
          color: "white",
          textAlign: "center",
        }}
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
