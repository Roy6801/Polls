import { useState, useEffect } from "react";
import Service from "../Service";
import "../stylesheets/Home.css";
import "../stylesheets/Register.css";
import "../stylesheets/User.css";

const CreatedPoll = () => {
  const [list, setList] = useState("$$$NULL$$$");

  if (list === "$$$NULL$$$") {
    Service.getPollListByAdmin(
      window.localStorage.getItem("polls-manager-system-G22-user")
    ).then((resp) => {
      if (resp.data !== "0") {
        setList(resp.data);
      }
    });
  }

  useEffect(() => {
    var mounted = true;
    setTimeout(() => {
      Service.getPollListByAdmin(
        window.localStorage.getItem("polls-manager-system-G22-user")
      ).then((resp) => {
        if (resp.data !== "0" && mounted) {
          setList(resp.data);
        }
      });
    }, 30000);
    return () => {
      mounted = false;
    };
  });

  return (
    <div className="mainDiv" style={{ backgroundColor: "rgb(226, 202, 61)" }}>
      <div className="created-poll">
        <h4>Created Polls</h4>
        <ul className="list">
          {Object.keys(list).map((key) => {
            return (
              <li
                key={key}
                onClick={(e) => {
                  window.location.replace("/PollInfo/create/" + key);
                }}
              >
                {list[key]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CreatedPoll;
