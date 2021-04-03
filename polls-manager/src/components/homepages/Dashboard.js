import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../stylesheets/Dashboard.css";
import NavbarDash from "../dashboardpages/NavbarDash";
import Createform from "../dashboardpages/Createform";
import Report from "../dashboardpages/Report";
import User from "../dashboardpages/User";
import About from "../dashboardpages/About";

function Dashboard(props) {
  const uName = props.location.state.userName;
  return (
      <Router>
        <NavbarDash />
        <Switch>
          <Route exact path="/dashboard" render={(props) => (<User userName = { uName  } />)} />
          <Route exact path="/dashboard/report" component={Report} />
          <Route exact path="/dashboard/user" component={User} />
          <Route exact path="/dashboard/createform" component={Createform} />
          <Route exact path ="/dashborad/about" component={About}/>
          
        </Switch>
      </Router>
  );
}

export default Dashboard;
