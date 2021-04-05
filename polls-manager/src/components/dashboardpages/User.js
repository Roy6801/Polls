import React, { useState } from "react";
import "../stylesheets/Home.css";
import Service from "../Service";
import Info from "./Info";
import ChartPoll from "./ChartPoll";
import RegisterList from "./RegisterList";

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
      <Info userName = {userName} />
      <ChartPoll />
      <RegisterList />
    </div>
  );
};

export default User;
