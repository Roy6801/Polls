import { useState, useEffect } from "react";
import Service from "../Service";
import "../stylesheets/Home.css";
import "../stylesheets/Register.css";
import "../stylesheets/User.css";

const ParticipateList = () => {
  const [list, setList] = useState("$$$NULL$$$");

  if (list === "$$$NULL$$$") {
    Service.getRegisteredInPolls(
      window.localStorage.getItem("polls-manager-system-G22-user"),
      1
    ).then((resp) => {
      if (resp.data !== "0") {
        setList(resp.data);
      }
    });
  }

  useEffect(() => {
    var mounted = true;
    setTimeout(() => {
      Service.getRegisteredInPolls(
        window.localStorage.getItem("polls-manager-system-G22-user"),
        1
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
      <div
        className="mainDiv"
        style={{ backgroundColor: " rgb(99, 201, 106)" }}
      >
        <div className="part-list">
          <h4 style={{ fontFamily: "Verdana", textAlign: "center" }}>
            Participated In Polls
          </h4>
          <div className="list">
            {Object.keys(list).map((i) => {
              return (
                <button
                  className="btn  button-style"
                  key={list[i][0]}
                  onClick={(e) => {
                    window.location.replace("/Poll/" + list[i][0]);
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
export default ParticipateList;
