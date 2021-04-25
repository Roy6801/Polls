import { useState, useEffect } from "react";
import Service from "../Service";
import { Chart } from "react-google-charts";
import "../stylesheets/User.css";

const ChartPoll = () => {
  const [list, setList] = useState("$$$NULL$$$");
  const [bar, setBar] = useState("$$$NULL$$$");
  const [pie, setPie] = useState("$$$NULL$$$");
  const user = window.localStorage.getItem("polls-manager-system-G22-user");

  if (list === "$$$NULL$$$") {
    Service.userAnalysis(user).then((resp) => {
      if (resp.data !== "0") {
        setList(resp.data);
      }
    });
  }

  if (bar === "$$$NULL$$$" && list !== "$$$NULL$$$") {
    setBar([
      ["", ""],
      ["Created", list["created"]],
      ["Registered", list["reg"]],
      ["Participated", list["part"]],
    ]);
  }

  if (pie === "$$$NULL$$$" && list !== "$$$NULL$$$") {
    setPie([
      ["", ""],
      ["Total Only Registered", list["onReg"]],
      ["Total Actually Participated", list["acPart"]],
    ]);
  }

  useEffect(() => {
    var mounted = true;
    setTimeout(() => {
      if (list !== "0" && mounted) {
        setList("$$$NULL$$$");
      }
    }, 30000);
    return () => {
      mounted = false;
    };
  });
  console.log(list, bar, pie);

  if (list !== "$$$NULL$$$" && bar !== "$$$NULL$$$" && pie !== "$$$NULL$$$") {
    return (
      <div
        className="mainDiv"
        style={{
          display: "flex",
          width: "95%",
          height: "70vh",
          backgroundColor: "#de647b",
        }}
      >
        <div
          style={{
            width: "70%",
          }}
        >
          <Chart
            width="100%"
            height="100%"
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={bar}
            options={{
              title: "Total Poll Count",
              colors: ["#d95069"],
              backgroundColor: "#ff7a93",
              chartArea: { width: "80%" },
              hAxis: {
                title: "Count",
                minValue: 0,
              },
            }}
          />
        </div>
        <div
          style={{
            width: "30%",
          }}
        >
          <Chart
            width="100%"
            height="100%"
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={pie}
            options={{
              title: "Avg. Audience Engagement",
              colors: ["#d95069", "#f55d79"],
              backgroundColor: "#ff7a93",
              chartArea: { width: "80%" },
            }}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default ChartPoll;
