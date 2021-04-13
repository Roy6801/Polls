import { useState } from "react";
import Proptypes from "prop-types";
import Service from "../Service";
import Success from "../Success";

const PollPart = ({ pollURL, vC }) => {
  return (
    <div>
      <h1>Poll Participate</h1>
    </div>
  );
};

PollPart.propTypes = {
  pollURL: Proptypes.string.isRequired,
  vC: Proptypes.string.isRequired,
};

export default PollPart;
