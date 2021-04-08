import "../stylesheets/Home.css";
import ChartPoll from "./ChartPoll";
import RegisterList from "./RegisterList";
import CreatedPoll from "./CreatedPoll";
import CreatedOngoing from "./CreatedOngoing";
import PartOngoing from "./PartOngoing";
import PollToStart from "./PollToStart";

const User = () => {
  return (
    <div>
      <ChartPoll />
      <RegisterList />
      <CreatedPoll />
      <CreatedOngoing />
      <PartOngoing />
      <PollToStart />
    </div>
  );
};

export default User;
