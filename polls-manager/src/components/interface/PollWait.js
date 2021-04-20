import PropTypes from "prop-types";
import CountDown from "../CountDown";
import "../stylesheets/Register.css";

const PollWait = ({ pollInfo, reg }) => {
  const ConditionalWait = () => {
    if (reg) {
      return (
        <div className="mainDiv">
          <h1>You have Registered already. Wait for Poll to start</h1>
          <CountDown time={pollInfo.timestamp} />
        </div>
      );
    } else {
      return (
        <div className="mainDiv">
          <h1>
            You have Participated already. Come back when Poll ends for Results
          </h1>
          <CountDown time={pollInfo.deadline} />
        </div>
      );
    }
  };

  return (
    <div>
      <ConditionalWait />
    </div>
  );
};

PollWait.propTypes = {
  pollInfo: PropTypes.object.isRequired,
  reg: PropTypes.bool.isRequired,
};

export default PollWait;
