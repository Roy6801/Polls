import { useState } from "react";
import PropTypes from "prop-types";
import PollReg from "./PollReg";
import PollPart from "./PollPart";
import PollWait from "./PollWait";

const VerifyForPoll = ({ vCriteria, scheduled, pollURL }) => {
  console.log(pollURL);
  const [vC, setVC] = useState("");
  const [proceed, setProceed] = useState(false);

  const handleChange = (e) => {
    setVC(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setProceed(true);
  };

  if (!proceed) {
    return (
      <div>
        <form onSubmit={handleClick}>
          <h3>Enter Verification ID</h3>
          <h1>Scheduled : {String(scheduled)}</h1>
          <input
            type="text"
            placeholder={vCriteria}
            required
            onChange={handleChange}
          />
          <button type="submit">Proceed</button>
        </form>
      </div>
    );
  } else {
    if (scheduled) {
      return <PollWait />;
    } else {
      return <PollPart pollURL={pollURL} vC={vC} />;
    }
  }
};

VerifyForPoll.propTypes = {
  vCriteria: PropTypes.string.isRequired,
  scheduled: PropTypes.bool.isRequired,
  pollURL: PropTypes.string.isRequired,
};

export default VerifyForPoll;
