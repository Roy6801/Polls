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
    if (reg === 1) {
      if (scheduled) {
        if (anonymity) {
          if (!started) {
            return <PollReg pollInfo={pollInfo} vC={""} />;
          } else {
            return <h1>Registration Ended!!</h1>;
          }
        } else {
          if (!started) {
            return <VerifyForPoll pollInfo={pollInfo} />;
          } else {
            return <h1>Registration Ended!!</h1>;
          }
        }
      } else {
        if (anonymity) {
          if (ended) {
            return <PollResult pollInfo={pollInfo} />;
          } else {
            return <PollPart pollInfo={pollInfo} vC={""} />;
          }
        } else {
          if (ended) {
            return <PollResult pollInfo={pollInfo} />;
          } else {
            return <VerifyForPoll pollInfo={pollInfo} />;
          }
        }
      }
    } else if (reg === 2) {
      if (!started) {
        return <PollWait pollInfo={pollInfo} reg={true} />;
      } else if (started && !ended) {
        return <PollPart pollInfo={pollInfo} vC={""} />;
      } else {
        return <PollResult pollInfo={pollInfo} />;
      }
    } else if (reg === 3) {
      if (ended) {
        return <PollResult pollInfo={pollInfo} />;
      } else {
        return <PollWait pollInfo={pollInfo} reg={false} />;
      }
    } else {
      return <h1>Fetching Data!!</h1>;
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(293deg, rgba(235,144,110,1) 33%, rgba(255,216,177,1) 66%, rgba(255,229,180,1) 99%)",
      }}
    >
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
