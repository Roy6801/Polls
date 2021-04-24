import { useState } from "react";
import Service from "./Service";
import "./stylesheets/Register.css";

const SearchPoll = () => {
  const [list, setList] = useState();

  const handleChange = (e) => {
    const val = e.target.value;
    if (val !== undefined && val !== null && val.length > 0) {
      Service.searchPolls(
        window.localStorage.getItem("polls-manager-system-G22-user"),
        val
      ).then((resp) => {
        setList(resp.data);
      });
    } else {
      setList(val);
    }
  };

  const DisplayList = () => {
    if (list !== undefined) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {Object.keys(list).map((key) => {
            return (
              <label
                key={key}
                style={{
                  color: "grey",
                  backgroundColor: "white",
                  margin: "0px",
                  width: "35vw",
                  padding: "5px",
                  border: "1px solid black",
                }}
                onClick={(e) => {
                  window.location.replace("/Poll/" + key);
                }}
              >
                {list[key]}
              </label>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className="mainDiv"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40vw",
        backgroundColor: "#418991",
      }}
    >
      <input
        type="text"
        className="input-control"
        placeholder="Search Poll"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {DisplayList()}
    </div>
  );
};

export default SearchPoll;
