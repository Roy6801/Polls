import { useState } from "react";
import { Redirect } from "react-router-dom";
import Proptypes from "prop-types";
import { BiClipboard } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/Register.css";

const Clipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const [home, setHome] = useState(false);

  const handleCLick = (e) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const DisplayCopied = () => {
    if (copied) {
      return <label>Copied!!</label>;
    }
    return null;
  };

  if (home) {
    return <Redirect exact to="/" />;
  }

  return (
    <div className="mainDiv">
      <div className="subDiv">
        <input
          type="text"
          className="input-control"
          value={text}
          disabled="disabled"
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={(e) => handleCLick(e)}
        >
          <BiClipboard />
        </button>
        <DisplayCopied />
      </div>
      <button
        type="submit"
        className="btn btn-success"
        onClick={(e) => setHome(true)}
      >
        Home
      </button>
    </div>
  );
};

Clipboard.propTypes = {
  text: Proptypes.string.isRequired,
};

export default Clipboard;
