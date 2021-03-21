import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/homepages/Navbar";
import Home from "./components/homepages/Home";
import Dashboard from "./components/homepages/Dashboard";
import Contact from "./components/homepages/Contact";
import About from "./components/homepages/About";
import Registration from "./components/login/Registration";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/register" component={Registration} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
