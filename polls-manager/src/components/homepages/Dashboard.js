import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/Dashboard.css";
import NavbarDash from "../dashboardpages/NavbarDash";
import HomeDash from "../dashboardpages/HomeDash";
import Createform from "../dashboardpages/Createform";
import Report from "../dashboardpages/Report";
function Dashboard() {
  return (
    <>
      <Router>
        <NavbarDash />
        <Switch>
          <Route exact path="/dashboard/home" component={HomeDash} />
          <Route exact path="/dashboard/report" component={Report} />
          <Route exact path="/dashboard/createform" component={Createform} />
        </Switch>
      </Router>
    </>
  );
}

export default Dashboard;
