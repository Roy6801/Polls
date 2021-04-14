import { useState } from "react";
import Proptypes from "prop-types";
import Service from "../Service";
import Success from "../Success";

const PollPart = ({ pollInfo, vC }) => {
  const [options, setOptions] = useState("$$$NULL$$$");

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
      <h1>{pollInfo.pollURL}</h1>
    </div>
  );
};

PollPart.propTypes = {
  pollInfo: Proptypes.object.isRequired,
  vC: Proptypes.string.isRequired,
};

export default PollPart;
