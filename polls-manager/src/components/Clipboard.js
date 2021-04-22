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
      return <label style={{ color: "white" }}>Copied!!</label>;
    }
    return null;
  };

  if (home) {
    return <Redirect exact to="/" />;
  }

  return (
    <div
      className="mainDiv"
      style={{
        display: "flex",
        width: "95%",
        backgroundColor: "#0d2247",
      }}
    >
      <input
        type="text"
        className="input-control"
        style={{
          flexGrow: "1",
          backgroundColor: "#5a8ee8",
          color: "white",
          fontWeight: "bold",
        }}
        value={text}
        disabled="disabled"
      />
      <button
        type="button"
        className="btn btn-success"
        style={{ backgroundColor: "#5a8ee8" }}
        onClick={(e) => handleCLick(e)}
      >
        <BiClipboard />
      </button>
      <DisplayCopied />
    </div>
  );
};

Clipboard.propTypes = {
  text: Proptypes.string.isRequired,
};

export default Clipboard;
