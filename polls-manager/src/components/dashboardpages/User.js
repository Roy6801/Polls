import React, { useState } from "react";
import '../stylesheets/Home.css';
import Info from './Info';
import ChartPoll from "./ChartPoll";
import RegisterList from "./RegisterList";


function User() {
  return(
    <>
      <div>
         <Info/>
         <ChartPoll/>
         <RegisterList/>
        
        
      </div>
    </>
  )
}
   
export default User;
