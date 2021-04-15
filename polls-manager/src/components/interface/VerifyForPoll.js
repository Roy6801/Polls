import { useState } from "react";
import PropTypes from "prop-types";
import PollReg from "./PollReg";
import PollPart from "./PollPart";
import PollWait from "./PollWait";

const VerifyForPoll = ({ pollInfo }) => {
  console.log(pollInfo.pollURL);
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
          <h1>Scheduled : {String(pollInfo.scheduled)}</h1>
          <input
            type="text"
            placeholder={pollInfo.verificationCriteria}
            required
            onChange={handleChange}
          />
          <button type="submit">Proceed</button>
        </form>
      </div>
    );
  } else {
    if (pollInfo.scheduled) {
      return <PollWait />;
    } else {
      return <PollPart pollInfo={pollInfo} vC={vC} />;
    }
  }
};

VerifyForPoll.propTypes = {
  pollInfo: PropTypes.object.isRequired,
};

export default VerifyForPoll;
