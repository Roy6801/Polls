import "../stylesheets/Home.css";
import ChartPoll from "./ChartPoll";
import RegisterList from "./RegisterList";
import CreatedPoll from "./CreatedPoll";
import CreatedOngoing from "./CreatedOngoing";
import PartOngoing from "./PartOngoing";
import PollToStart from "./PollToStart";

const User = () => {
  return (
    <div style={{background: "linear-gradient(293deg, rgba(235,144,110,1) 33%, rgba(255,216,177,1) 66%, rgba(255,229,180,1) 99%)",display:"flex" , flexDirection:"column"}}>
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
