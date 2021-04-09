import "../stylesheets/Home.css";
import ChartPoll from "./ChartPoll";
import RegisterList from "./RegisterList";
import CreatedPoll from "./CreatedPoll";
import CreatedOngoing from "./CreatedOngoing";
import PartOngoing from "./PartOngoing";
import PollToStart from "./PollToStart";
import Service from "../Service";

const User = () => {
  return (
    <div>
      <div style={{ margin: "20px" }}>
        <ChartPoll />
      </div>
      <div style={{ margin: "20px" }}>
        <RegisterList />
      </div>
      <div style={{ margin: "20px" }}>
        <CreatedPoll />
      </div>
      <div style={{ margin: "20px" }}>
        <CreatedOngoing />
      </div>
      <div style={{ margin: "20px" }}>
        <PartOngoing />
      </div>
      <div style={{ margin: "20px" }}>
        <PollToStart />
      </div>
    </div>
  );
};

export default User;
