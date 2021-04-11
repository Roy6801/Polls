import PropTypes from "prop-types";

const PollResult = ({ pollURL }) => {
  return (
    <div>
      <h1>Poll Results</h1>
    </div>
  );
};

PollResult.propTypes = {
  pollURL: PropTypes.string.isRequired,
};

export default PollResult;
