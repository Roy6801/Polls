import PropTypes from "prop-types";

const PollResult = ({ pollInfo }) => {
  return (
    <div>
      <h1>Poll Results : {pollInfo.poll_Id}</h1>
    </div>
  );
};

PollResult.propTypes = {
  pollInfo: PropTypes.object.isRequired,
};

export default PollResult;
