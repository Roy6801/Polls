import { useState } from "react";

function HomeDash(props) {
  return (
    <div className="home">
      <h1>{props.userName}</h1>
    </div>
  );
}

export default HomeDash;
