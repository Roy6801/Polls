import React from "react";

import "../stylesheets/MyStyle.css";

function About() {
  return (
    <div
      style={{
        backgroundImage: `url("https://cdn3.vectorstock.com/i/thumb-large/55/77/dark-blue-background-vector-22385577.jpg")`,
        background_position: "center",
       background_repeat: "no_repeat",
        minHeight:"80vh",
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center"
      }}
    >
      <h1 style={{ color: "white" , top:"20vh" , position:"absolute"}} >
        About Us
      </h1>
      <br/>
      <i style={{ color: "white", padding:"20px", top:"30vh" , position:"absolute"}}>
        The Polls Management System is a python-based web-application. This can
        be used for holding Elections and collecting users’valuable opinion.
        This can be really helpful for giving a direction to a particular
        subject depending on public opinion.
      </i>
     
      <div style={{ color: "white", bottom:"6vh",position:"absolute", textAlign:"center"}} >
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
