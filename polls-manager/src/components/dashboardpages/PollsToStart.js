import { useState, useEffect } from "react";
import Service from "../Service";
import "../stylesheets/Home.css";
import "../stylesheets/Register.css";
import "../stylesheets/User.css";

function PollsToStart() {
  const [list, setList] = useState("$$$NULL$$$");

  if (list === "$$$NULL$$$") {
    Service.getPollsToStart(
      window.localStorage.getItem("polls-manager-system-G22-user"),
      Math.floor(new Date().getTime() / 1000)
    ).then((resp) => {
      if (resp.data !== "0") {
        setList(resp.data);
      }
    });
  }

  useEffect(() => {
    var mounted = true;
    setTimeout(() => {
      Service.getPollsToStart(
        window.localStorage.getItem("polls-manager-system-G22-user"),
        Math.floor(new Date().getTime() / 1000)
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

  if (list !== "$$$NULL$$$") {
    return (
      <div className="mainDiv" style={{ backgroundColor: "rgb(213, 90, 90)" }}>
        <div className="poll-to-start">
          <h4>Polls About To Start (For Polls you Registered)</h4>
          <ul className="list">
            {Object.keys(list).map((i) => {
              return (
                <li
                  key={list[i][0]}
                  onClick={(e) => {
                    window.location.replace("/Poll/" + list[i][0]);
                  }}
                >
                  {list[i][1]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  return null;
}
export default PollsToStart;
