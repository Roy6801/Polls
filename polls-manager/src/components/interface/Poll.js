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
  const [vCriteria, setVCriteria] = useState("$$$NULL$$$");
  const [pollInfo, setPollInfo] = useState("$$$NULL$$$");
  const url = props.match.params.pollURL;
  const user = {
    poll_Id: pollInfo.poll_Id,
    userName: window.localStorage.getItem("polls-manager-system-G22-user"),
  };

  if (pollInfo === "$$$NULL$$$") {
    Service.getPollInfo(url).then((resp) => {
      setPollInfo(resp.data);
    });
  } else if (reg === "$$$NULL$$$") {
    Service.userPresent(user).then((resp) => {
      const flag = resp.data.response;
      if (flag !== 0) {
        setReg(flag);
      }
    });
  }

  const time = new Date().getTime();

  if (setStarted === "$$$NULL$$$") {
    if (time > Number(pollInfo.timestamp)) {
      setStarted(true);
    }
  }
  if (setEnded === "$$$NULL$$$") {
    if (time < Number(pollInfo.deadline)) {
      setEnded(true);
    }
  }
  if (setScheduled === "$$$NULL$$$") {
    if (pollInfo.scheduled === 1) {
      setScheduled(true);
    }
  }
  if (setAnonymity === "$$$NULL$$$") {
    if (pollInfo.anonymity === 0) {
      setAnonymity(false);
    }
  }
  if (setVCriteria === "$$$NULL$$$") {
    if (pollInfo.verificationCriteria !== "") {
      setVCriteria(pollInfo.verificationCriteria);
    }
  }

  if (reg === 1) {
    if (scheduled) {
      if (anonymity) {
        if (!started) {
          return <PollReg pollURL={pollInfo.poll_Id} vC={""} />;
        } else {
          return <h1>Registration Ended!!</h1>;
        }
      } else {
        if (!started) {
          return (
            <VerifyForPoll
              vCriteria={vCriteria}
              pollURL={pollInfo.poll_Id}
              scheduled={scheduled}
            />
          );
        } else {
          return <h1>Registration Ended!!</h1>;
        }
      }
    } else {
      if (anonymity) {
        if (ended) {
          return <PollResult pollURL={pollInfo.poll_Id} />;
        } else {
          return <PollPart pollURL={pollInfo.poll_Id} vC={""} />;
        }
      } else {
        if (ended) {
          return <PollResult pollURL={pollInfo.poll_Id} />;
        } else {
          return (
            <VerifyForPoll
              vCriteria={vCriteria}
              pollURL={pollInfo.poll_Id}
              scheduled={scheduled}
            />
          );
        }
      }
    }
  } else if (reg === 2) {
    if (!started) {
      return <PollWait reg={true} />;
    } else if (started && !ended) {
      return <PollPart pollURL={pollInfo.poll_Id} vC={""} />;
    } else {
      return <PollResult pollURL={pollInfo.poll_Id} />;
    }
  } else if (reg === 3) {
    if (ended) {
      return <PollResult pollURL={pollInfo.poll_Id} />;
    } else {
      return <PollWait reg={false} />;
    }
  } else {
    return <h1>Fetching Data!!</h1>;
  }
};

export default Poll;
