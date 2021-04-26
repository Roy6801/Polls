import { useState } from "react";
import PollResult from "../interface/PollResult";
import Clipboard from "../Clipboard";
import CountDown from "../CountDown";
import HomeBtn from "../HomeBtn";
import Service from "../Service";
import "../stylesheets/Register.css";

const AdminPoll = (props) => {
  const [admin, setAdmin] = useState("$$$NULL$$$");
  const [poll, setPoll] = useState("$$$NULL$$$");
  const [pollInfo, setPollInfo] = useState("$$$NULL$$$");

  if (admin === "$$$NULL$$$") {
    const user = window.localStorage.getItem("polls-manager-system-G22-user");
    if (user === props.match.params.userName) {
      setAdmin(user);
    }
  }

  if (poll === "$$$NULL$$$") {
    setPoll(props.match.params.pollURL);
  }

  if (pollInfo === "$$$NULL$$$" && poll !== "$$$NULL$$$") {
    Service.getPollInfo(poll).then((resp) => {
      if (resp.data !== "0") {
        setPollInfo(resp.data);
      }
    });
  }

  const ConditionalPollInfo = () => {
    const AdminTimer = () => {
      var current = Math.floor(new Date().getTime() / 1000);
      if (current < pollInfo.deadline) {
        if (current < pollInfo.timestamp) {
          return (
            <div className="mainDiv blockDiv">
              <CountDown time={pollInfo.timestamp} />
              <h4>Poll Starts in</h4>
            </div>
          );
        } else {
          return (
            <div className="mainDiv blockDiv">
              <CountDown time={pollInfo.deadline} />
              <h4>Poll Ongoing</h4>
            </div>
          );
        }
      } else {
        return (
          <div className="mainDiv blockDiv">
            <h4>Results Declared</h4>
          </div>
        );
      }
    };

    if (pollInfo !== "$$$NULL$$$" && admin === pollInfo.adminUserName) {
      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1
              className="mainDiv"
              style={{
                color: "#5db078",
                backgroundColor: "#cdf7db",
                fontWeight: "bolder",
              }}
            >
              {pollInfo.pollName}
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexGrow: "1",
              }}
            >
              <Clipboard text={pollInfo.pollURL} />
            </div>
            {AdminTimer()}
          </div>
          <PollResult pollInfo={pollInfo} />
        </div>
      );
    } else if (pollInfo !== "$$$NULL$$$" && admin !== pollInfo.adminUserName) {
      return (
        <div className="mainDiv">
          <h1>Restricted Access!!</h1>
        </div>
      );
    } else {
      return <h1>Fetching Data...</h1>;
    }
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        background:
          "linear-gradient(293deg, rgba(235,144,110,1) 33%, rgba(255,216,177,1) 66%, rgba(255,229,180,1) 99%)",
      }}
    >
      {ConditionalPollInfo()}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HomeBtn />
      </div>
    </div>
  );
};

export default AdminPoll;
