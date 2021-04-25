import { useState, useEffect } from "react";
import Service from "../Service";
import "../stylesheets/Home.css";
import "../stylesheets/Register.css";
import "../stylesheets/User.css";

const CreatedPoll = () => {
  const [list, setList] = useState("$$$NULL$$$");
  const user = window.localStorage.getItem("polls-manager-system-G22-user");

  if (list === "$$$NULL$$$") {
    Service.getPollListByAdmin(user).then((resp) => {
      if (resp.data !== "0") {
        setList(resp.data);
      }
    });
  }

  useEffect(() => {
    var mounted = true;
    setTimeout(() => {
      Service.getPollListByAdmin(user).then((resp) => {
        if (resp.data !== "0" && mounted) {
          setList(resp.data);
        }
      });
    }, 30000);
    return () => {
      mounted = false;
    };
  });

  if (list !== "$$$NULL$$$") {
    return (
      <div className="mainDiv" style={{ backgroundColor: "rgb(226, 202, 61)" }}>
        <div className="created-poll">
          <h4 style={{ fontFamily: "Verdana", textAlign: "center" }}>
            Created Polls
          </h4>
          <div className="list">
            {Object.keys(list).map((i) => {
              return (
                <button
                  className="btn button-style"
                  key={list[i][0]}
                  onClick={(e) => {
                    window.location.replace(
                      "/PollInfo/" + user + "/" + list[i][0]
                    );
                  }}
                >
                  {list[i][1]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default CreatedPoll;
