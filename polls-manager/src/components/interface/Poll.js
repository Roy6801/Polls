import { useState } from "react";
import Service from "../Service";
import PollPart from "./PollPart";
import PollReg from "./PollReg";
import PollResult from "./PollResult";
import PollWait from "./PollWait";
import VerifyForPoll from "./VerifyForPoll";

const Poll = (props) => {
  const [started, setStarted] = useState("$$$NULL$$$");
  const [ended, setEnded] = useState("$$$NULL$$$");
  const [reg, setReg] = useState("$$$NULL$$$");
  const [scheduled, setScheduled] = useState("$$$NULL$$$");
  const [anonymity, setAnonymity] = useState("$$$NULL$$$");
  const [pollInfo, setPollInfo] = useState("$$$NULL$$$");
  const url = props.match.params.pollURL;
  const user = {
    poll_Id: pollInfo.poll_Id,
    userName: window.localStorage.getItem("polls-manager-system-G22-user"),
  };

  if (pollInfo === "$$$NULL$$$") {
    Service.getPollInfo(url).then((resp) => {
      if (resp.data !== "0") {
        setPollInfo(resp.data);
      }
    });
  } else if (reg === "$$$NULL$$$") {
    Service.userPresent(user).then((resp) => {
      const flag = resp.data.response;
      if (flag !== 0) {
        setReg(flag);
      }
    });
  }

  const time = Math.floor(new Date().getTime() / 1000);

  if (started === "$$$NULL$$$") {
    if (time > Number(pollInfo.timestamp)) {
      setStarted(true);
    } else if (time < Number(pollInfo.timestamp)) {
      setStarted(false);
    }
  }
  if (ended === "$$$NULL$$$") {
    if (time > Number(pollInfo.deadline)) {
      setEnded(true);
    } else if (time < Number(pollInfo.deadline)) {
      setEnded(false);
    }
  }
  if (scheduled === "$$$NULL$$$") {
    if (pollInfo.scheduled === 1) {
      setScheduled(true);
    } else if (pollInfo.scheduled === 0) {
      setScheduled(false);
    }
  }
  if (anonymity === "$$$NULL$$$") {
    if (pollInfo.anonymity === 1) {
      setAnonymity(true);
    } else if (pollInfo.anonymity === 0) {
      setAnonymity(false);
    }
  }

  const ConditionalPoll = () => {
    var set;
    switch (reg) {
      case 1:
        {
          if (scheduled) {
            if (anonymity) {
              if (!started) {
                set = <PollReg pollInfo={pollInfo} vC={""} />;
              } else {
                set = <h1>Registration Ended!!</h1>;
              }
            } else {
              if (!started) {
                set = <VerifyForPoll pollInfo={pollInfo} />;
              } else {
                set = <h1>Registration Ended!!</h1>;
              }
            }
          } else {
            if (anonymity) {
              if (ended) {
                set = <PollResult pollInfo={pollInfo} />;
              } else {
                set = <PollPart pollInfo={pollInfo} vC={""} />;
              }
            } else {
              if (ended) {
                set = <PollResult pollInfo={pollInfo} />;
              } else {
                set = <VerifyForPoll pollInfo={pollInfo} />;
              }
            }
          }
        }
        break;
      case 2:
        {
          if (!started) {
            set = <PollWait pollInfo={pollInfo} reg={true} />;
          } else if (started && !ended) {
            set = <PollPart pollInfo={pollInfo} vC={""} />;
          } else {
            set = <PollResult pollInfo={pollInfo} />;
          }
        }
        break;
      case 3:
        {
          if (ended) {
            set = <PollResult pollInfo={pollInfo} />;
          } else {
            set = <PollWait pollInfo={pollInfo} reg={false} />;
          }
        }
        break;
      default:
        set = null;
        break;
    }
    return set;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "linear-gradient(293deg, rgba(235,144,110,1) 33%, rgba(255,216,177,1) 66%, rgba(255,229,180,1) 99%)",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1
        className="mainDiv"
        style={{
          backgroundColor: "#57c2be",
          color: "white",
          fontWeight: "bolder",
        }}
      >
        {pollInfo.pollName}
      </h1>
      <ConditionalPoll />
      <button
        type="button"
        style={{ width: "10vw" }}
        className="btn btn-success"
        onClick={(e) => {
          window.location.replace("/");
        }}
      >
        Home
      </button>
    </div>
  );
};

export default Poll;
