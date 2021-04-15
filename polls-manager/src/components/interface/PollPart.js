import { useState } from "react";
import Proptypes from "prop-types";
import Service from "../Service";
import Success from "../Success";

const PollPart = ({ pollInfo, vC }) => {
  const [options, setOptions] = useState("$$$NULL$$$");
  const [scheduled, setScheduled] = useState(pollInfo.scheduled);

  if (options === "$$$NULL$$$") {
    Service.getPollOptions(pollInfo.poll_Id).then((resp) => {
      if (resp.data !== 0) {
        setOptions(resp.data);
      }
    });
  } else {
    for (var i = 0; i < options.length; i++) {
      console.log(options[i]);
    }
  }

  return (
    <div>
      <h1>{pollInfo.pollName}</h1>
      <h1>{pollInfo.anonymity}</h1>
      <h1>{pollInfo.scheduled}</h1>
      <h1>{vC}</h1>
      <h1>{pollInfo.timestamp}</h1>
      <h1>{pollInfo.adminUserName}</h1>
    </div>
  );
};

PollPart.propTypes = {
  pollInfo: Proptypes.object.isRequired,
  vC: Proptypes.string.isRequired,
};

export default PollPart;
