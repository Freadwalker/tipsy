import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./Pages/home";
import Lobby from "./Pages/Lobby";
import Login from "./Pages/login"
require('dotenv').config();

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/lobby" component={Lobby}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </Router>
    );
  }
}
