
import React from 'react'

import "../stylesheets/MyStyle.css";

 function About() {
    return (
        <div
            style={{

          backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-business-finance-hd-background-image_145887.jpg")`,
          background_position: "center",
          background_repeat: "no_repeat",
        }}
      >

          <h1 style={{ color: "black" }} align="center">

            About Us...
          </h1>
          <br></br>

          <i>
            The Polls Management System is a python-based webapplication. This
            can be used for holding Elections and collecting users’valuable
            opinion. This can be really helpful for giving a direction to a
            particular subject depending on public opinion.
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
          <div style={{ color: "black" }} align="center">
            <br></br>
            <h6>For more information, please visit</h6>
            <h7>Pillai College Of Engineering</h7>
            <br></br>
            <h7>8767635949</h7>
            <br></br>
            <h7>Group22@gmail.com</h7>
          </div>
        </div>
    );
}

export default About;
