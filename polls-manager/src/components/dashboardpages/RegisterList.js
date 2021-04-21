import { useState, useEffect } from "react";
import Service from "../Service";
import "../stylesheets/Home.css";
import "../stylesheets/Register.css";
import "../stylesheets/User.css";
const RegisterList = () => {
  const [list, setList] = useState("$$$NULL$$$");

  if (list === "$$$NULL$$$") {
    Service.getRegisteredInPolls(
      window.localStorage.getItem("polls-manager-system-G22-user"),
      0
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
        0
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
      <div className="mainDiv" style={{ backgroundColor: "rgb(50, 92, 141)" }}>
        <div className="register-list">
          <h4>Registered For Polls (Not Participated)</h4>
          <ul className="list">
            {Object.keys(list).map((i) => {
              return (
                <li
                  key={list[i][0]}
                  onClick={(e) => {
                    window.location.replace("/Poll/" + list[i][0]);
                  }}
                >
                  {(i, list[i][1])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  return null;
};
export default RegisterList;
