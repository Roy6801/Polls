import React, { useState } from "react";
import Paper from '@material-ui/core/Paper';
import Card from 'react-bootstrap/Card'
import '../stylesheets/Home.css';
import Media from 'react-bootstrap/Media';
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
