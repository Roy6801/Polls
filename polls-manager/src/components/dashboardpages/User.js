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
      <div className="flex-container">
        <ChartPoll />
      </div>
      <div className="flex-container">
          <RegisterList />
          <CreatedPoll />
        
      </div>

      <div className="flex-container">
          <CreatedOngoing />
          <PartOngoing />
      </div>
      <div className="flex-container">
        <PollToStart />
      </div>
    </div>
  );
};

export default User;
