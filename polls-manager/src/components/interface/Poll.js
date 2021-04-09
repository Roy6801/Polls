import { useState } from "react";
import Service from "../Service";
import PollPart from "./PollPart";
import PollReg from "./PollReg";
import PollResult from "./PollResult";
import VerifyForPoll from "./VerifyForPoll";

const Poll = (props) => {
  const [ended, setEnded] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [anonymity, setAnonymity] = useState(true);
  const [vCriteria, setVCriteria] = useState("$$$NULL$$$");

  const userName = props.match.params.userName;
  const url = props.match.params.pollURL;
  Service.getPollInfo(url).then((resp) => {
    const time = new Date().getTime();
    if (time < Number(resp.data.deadline)) {
      setEnded(true);
    }
    if (resp.data.scheduled === 1) {
      setScheduled(true);
    }
    if (resp.data.anonymity === 0) {
      setAnonymity(false);
    }
    if (resp.data.verificationCriteria !== "") {
      setVCriteria(resp.data.verificationCriteria);
    }
  });

  if (!ended) {
    if (anonymity) {
      if (!scheduled) {
        return <PollPart />;
      } else {
        return <PollReg />;
      }
    } else {
      return <VerifyForPoll vCriteria={vCriteria} scheduled={scheduled} />;
    }
  } else {
    return <PollResult />;
  }
};

export default Poll;
