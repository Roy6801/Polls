import { useState, useEffect } from "react";
import "./stylesheets/Register.css";

const CountDown = ({ time }) => {
  const [rem, setRem] = useState();

  useEffect(() => {
    setTimeout(() => {
      const now = Math.floor(new Date().getTime() / 1000);
      const temp = new Date((time - now) * 1000 > 0 ? (time - now) * 1000 : 0);
      const days = (temp.getUTCDate() - 1).toString().padStart(3, "0");
      const hrs = temp.getUTCHours().toString().padStart(2, "0");
      const mins = temp.getUTCMinutes().toString().padStart(2, "0");
      const secs = temp.getUTCSeconds().toString().padStart(2, "0");
      const timeString = days + "D " + hrs + "H " + mins + "M " + secs + "S";
      setRem(timeString);
    }, 1000);
  });

  if (rem === "000D 00H 00M 00S") {
    window.location.reload();
  }

  return (
    <div
      className="mainDiv"
      style={{
        color: "white",
        backgroundColor: "#52e3c3",
        fontSize: "2vw",
        fontWeight: "bold",
      }}
    >
      {rem}
    </div>
  );
};

export default CountDown;
