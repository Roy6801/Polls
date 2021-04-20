import { useState, useEffect } from "react";
import Service from "../Service";
import "../stylesheets/Home.css";
import "../stylesheets/Register.css";
import "../stylesheets/User.css";
function RegisterList() {
  const [list, setList] = useState("$$$NULL$$$");

  if (list === "$$$NULL$$$") {
    Service.getRegisteredInPolls(
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
      Service.getRegisteredInPolls(
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
    <div className="mainDiv" style={{ backgroundColor: "rgb(50, 92, 141)" }}>
      <div className="register-list">
        <h4>Registered For Polls</h4>
        <ul className="list">
          {Object.keys(list).map((key) => {
            return (
              <li
                key={key}
                onClick={(e) => {
                  window.location.replace("/Poll/" + key);
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
}
export default RegisterList;
