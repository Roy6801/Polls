import { useState } from "react";
import PollResult from "../interface/PollResult";
import Service from "../Service";

const AdminPoll = (props) => {
  const [poll, setPoll] = useState("$$$NULL$$$");
  const [pollInfo, setPollInfo] = useState("$$$NULL$$$");

  console.log(poll, pollInfo);

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

  if (pollInfo !== "$$$NULL$$$") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background:
            "linear-gradient(293deg, rgba(235,144,110,1) 33%, rgba(255,216,177,1) 66%, rgba(255,229,180,1) 99%)",
        }}
      >
        <PollResult pollInfo={pollInfo} />
        <button
          type="button"
          style={{ width: "25%" }}
          className="btn btn-success"
          onClick={(e) => {
            window.location.replace("/");
          }}
        >
          Back
        </button>
      </div>
    );
  } else {
    return <h1>Fetching Data...</h1>;
  }
};

export default AdminPoll;
