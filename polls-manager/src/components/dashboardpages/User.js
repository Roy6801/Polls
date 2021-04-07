import React, { useState } from "react";
import "../stylesheets/Home.css";
import Service from "../Service";
import Info from "./Info";
import ChartPoll from "./ChartPoll";
import RegisterList from "./RegisterList";
import CreatedPoll from "./CreatedPoll";
import CreatedOngoing  from "./CreatedOngoing";
import PartOngoing from "./PartOngoing";
import PollToStart from "./PollToStart";

const User = () => {
  const [userName, setUserName] = useState();
  const user = {
    userToken: window.localStorage.getItem("polls-manager-system-G22"),
  };
  Service.verifyToken(user).then((resp) => {
    setUserName(resp.data.response.userName);
  });
  return (
    <div>
      <Info userName={userName} />
      <ChartPoll />
      <RegisterList />
      <CreatedPoll/>
      <CreatedOngoing/>
      <PartOngoing/>
      <PollToStart/>
    </div>
  );
};

export default User;
