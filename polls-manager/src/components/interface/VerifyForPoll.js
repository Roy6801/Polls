import PropTypes from "prop-types";

const VerifyForPoll = ({ vCriteria, scheduled }) => {
  return (
    <div>
      <h3>Enter Verification ID</h3>
      <h1>Scheduled : {String(scheduled)}</h1>
      <input type="text" placeholder={vCriteria} />
    </div>
  );
};

VerifyForPoll.propTypes = {
  vCriteria: PropTypes.string.isRequired,
  scheduled: PropTypes.bool.isRequired,
};

export default VerifyForPoll;
