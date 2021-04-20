import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";
import Service from "../Service";
import "../stylesheets/Register.css";

const PollResult = ({ pollInfo }) => {
  const [result, setResult] = useState("$$$NULL$$$");
  const [part, setPart] = useState("$$$NULL$$$");
  const [list, setList] = useState("$$$NULL$$$");

  useEffect(() => {
    var mounted = true;
    setTimeout(() => {
      if (mounted && list !== "$$$NULL$$$") {
        setList("$$$NULL$$$");
        setResult("$$$NULL$$$");
        setPart("$$$NULL$$$");
      }
    }, 60000);
    return () => {
      mounted = false;
    };
  });

  if (result === "$$$NULL$$$") {
    Service.getPollResults(pollInfo.poll_Id).then((resp) => {
      if (resp.data !== "0") {
        var arr = [["", ""]];
        Object.keys(resp.data).map((key) => {
          arr.push([key, resp.data[key]]);
          return null;
        });
        setResult(arr);
      }
    });
  }

  if (list === "$$$NULL$$$") {
    Service.getParticipants(pollInfo.poll_Id).then((resp) => {
      if (resp.data !== "0") {
        setList(resp.data);
      }
    });
  }

  if (part === "$$$NULL$$$" && list !== "$$$NULL$$$") {
    var regNum = Object.keys(list).length;
    var partNum = 0;
    Object.keys(list).map((key) => {
      if (list[key][0] === 1) {
        partNum++;
      }
      return null;
    });
    setPart([
      ["", ""],
      ["Only Regsitered", regNum - partNum],
      ["Actually Participated", partNum],
    ]);
  }

  const ConditionalResult = () => {
    if (
      result !== "$$$NULL$$$" &&
      part !== "$$$NULL$$$" &&
      list !== "$$$NULL$$$"
    ) {
      return (
        <div>
          <div style={{ display: "flex" }}>
            <div className="mainDiv" style={{ backgroundColor: "#ffcfbd" }}>
              <Chart
                width="50vw"
                height="50vh"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={result}
                options={{
                  title: pollInfo.pollName,
                  backgroundColor: "#ffcfbd",
                  chartArea: { width: "100%" },
                  hAxis: {
                    title: "Votes",
                    minValue: 0,
                  },
                }}
              />
            </div>
            <div
              className="mainDiv"
              style={{ backgroundColor: "#cdf7db", flexGrow: "1" }}
            >
              <Chart
                height="50vh"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={part}
                options={{
                  title: "Participation %",
                  colors: ["#95deaf", "#5db078"],
                  backgroundColor: "#cdf7db",
                  chartArea: { width: "100%" },
                  hAxis: {
                    title: "Votes",
                    minValue: 0,
                  },
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              className="mainDiv"
              style={{
                height: "90vh",
                overflow: "auto",
                backgroundColor: "#d5edf5",
              }}
            >
              <table style={{ border: "10px" }}>
                <thead>
                  <tr>
                    <td>UserName</td>
                    <td>Participated</td>
                    <td>VerificationId</td>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(list).map((key) => {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{list[key][0] === 1 ? "Yes" : "No"}</td>
                        <td>
                          {pollInfo.anonymity === 1 ? "NA" : list[key][1]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div
              className="mainDiv"
              style={{ flexGrow: "1", backgroundColor: "#f2dc9b" }}
            >
              <Chart
                height="80vh"
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={result}
                options={{
                  title: pollInfo.pollName,
                  colors: ["#e6c25a"],
                  backgroundColor: "#f2dc9b",
                  chartArea: { width: "80%" },
                  hAxis: {
                    title: "Votes",
                    minValue: 0,
                  },
                }}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Fetching Data...</h1>;
    }
  };

  return (
    <div>
      <ConditionalResult />
    </div>
  );
};

PollResult.propTypes = {
  pollInfo: PropTypes.object.isRequired,
};

export default PollResult;
