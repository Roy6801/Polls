import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../stylesheets/Dashboard.css";
import NavbarDash from "./NavbarDash";
import HomeDash from "./HomeDash";
import Createform from "./Createform";
import Report from "./Report";

function Dashboard(props) {
  const uName = props.location.state.userName;
  return (
    <Router>
      <NavbarDash />
      <Switch>
        <Route
          exact
          path="/dashboard"
          render={(props) => <HomeDash userName={uName} />}
        />
        <Route exact path="/dashboard/report" component={Report} />
        <Route exact path="/dashboard/createform" component={Createform} />
      </Switch>
    </Router>
  );
}

export default Dashboard;
