import { useState } from "react";
import PollResult from "../interface/PollResult";
import Service from "../Service";

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
    if (pollInfo !== "$$$NULL$$$" && admin === pollInfo.adminUserName) {
      return (
        <div>
          <PollResult pollInfo={pollInfo} />
        </div>
      );
    } else if (pollInfo !== "$$$NULL$$$" && admin !== pollInfo.adminUserName) {
      return (
        <div>
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
        background:
          "linear-gradient(293deg, rgba(235,144,110,1) 33%, rgba(255,216,177,1) 66%, rgba(255,229,180,1) 99%)",
      }}
    >
      <ConditionalPollInfo />
      <button
        type="button"
        style={{ width: "10vw" }}
        className="btn btn-success"
        onClick={(e) => {
          window.location.replace("/");
        }}
      >
        Home
      </button>
    </div>
  );
};

export default AdminPoll;
