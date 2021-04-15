import { useState } from "react";
import PropTypes from "prop-types";
import PollReg from "./PollReg";
import PollPart from "./PollPart";
import Service from "../Service";

const VerifyForPoll = ({ pollInfo }) => {
  console.log(pollInfo.pollURL);
  const [vC, setVC] = useState("");
  const [proceed, setProceed] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setProceed(true);
  };

  if (!proceed) {
    return (
      <div className="mainDiv">
        <form onSubmit={handleClick}>
          <h3>Enter Verification ID</h3>
          <h1>Scheduled For : {String(pollInfo.timestamp)}</h1>
          <input
            type="text"
            className="input-control"
            placeholder={pollInfo.verificationCriteria}
            required
            onChange={(e) => setVC(e.target.value)}
          />
          <button type="submit" className="btn btn-success">
            Proceed
          </button>
        </form>
      </div>
    );
  } else {
    if (pollInfo.scheduled === 1) {
      return <PollReg pollInfo={pollInfo} vC={vC} />;
    } else {
      return <PollPart pollInfo={pollInfo} vC={vC} />;
    }
  }
};

VerifyForPoll.propTypes = {
  pollInfo: PropTypes.object.isRequired,
};

export default VerifyForPoll;
