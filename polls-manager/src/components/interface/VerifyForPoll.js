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
      <div className="mainDiv" style={{background: "linear-gradient(140deg, rgba(248,222,126,1) 39%, rgba(255,253,208,1) 100%)"}}>
        <form onSubmit={handleClick}>
          <h1>Enter Verification ID</h1>
          <h3>Scheduled For : {String(new Date(pollInfo.timestamp * 1000))}</h3>
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
