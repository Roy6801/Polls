import { useState } from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";
import Service from "../Service";
import "../stylesheets/Register.css";

const PollResult = ({ pollInfo }) => {
  const [result, setResult] = useState("$$$NULL$$$");

  if (result === "$$$NULL$$$") {
    Service.getPollResults(pollInfo.poll_Id).then((resp) => {
      if (resp.data !== "0") {
        var arr = [["", ""]];
        Object.keys(resp.data).map((key) => {
          arr.push([key, resp.data[key]]);
        });
        setResult(arr);
      }
    });
  }

  console.log(result);

  if (result !== "$$$NULL$$$") {
    return (
      <div style={{ display: "flex" }}>
        <div className="mainDiv" style={{ backgroundColor: "white" }}>
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={result}
            options={{
              title: pollInfo.pollName,
              chartArea: { width: "50%" },
              hAxis: {
                title: "Votes",
                minValue: 0,
              },
            }}
          />
        </div>
        <div className="mainDiv" style={{ backgroundColor: "white" }}>
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={result}
            options={{
              title: pollInfo.pollName,
              chartArea: { width: "50%" },
              hAxis: {
                title: "Votes",
                minValue: 0,
              },
            }}
          />
        </div>
      </div>
    );
  } else {
    return <h1>Fetching Data...</h1>;
  }
};

PollResult.propTypes = {
  pollInfo: PropTypes.object.isRequired,
};

export default PollResult;
