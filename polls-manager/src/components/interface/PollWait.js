import PropTypes from "prop-types";

const PollWait = ({ reg }) => {
  if (reg) {
    return (
      <div>
        <h1>You have Registered already. Wait for Poll to start</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          You have Participated already. Come back when Poll ends for Results
        </h1>
      </div>
    );
  }
};

PollWait.propTypes = {
  reg: PropTypes.bool.isRequired,
};

export default PollWait;
