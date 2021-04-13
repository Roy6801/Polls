import React from "react";

import "../stylesheets/MyStyle.css";

function About() {
  return (
    <div
      style={{
        backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-business-finance-hd-background-image_145887.jpg")`,
        background_position: "center",
        background_repeat: "no_repeat"
      }}
    >
      <h1 style={{ color: "white" }} align="center">
        About Us
      </h1>
      <br/>
      <i style={{ color: "white", padding:"20px"}}>
        The Polls Management System is a python-based web-application. This can
        be used for holding Elections and collecting users’valuable opinion.
        This can be really helpful for giving a direction to a particular
        subject depending on public opinion.
      </i>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ color: "white" }} align="center">
        <br />
        <br />
        <h5>For more information, please visit</h5>
        <h6>Pillai College Of Engineering</h6>
        <h6>8767635949</h6>
        <h6>Group22@gmail.com</h6>
        <br/>
      </div>
    </div>
  );
}

export default About;
