import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./Pages/home";
import Lobby from "./Pages/Lobby";
import Login from "./Pages/login"
import Tutorial from "./Pages/tutorial"
import Waiting from "./Pages/waiting"
import WaitingQuestions from "./Pages/waitingQuestions"
import AnswerQuestions from "./Pages/answerQuestions"

export default class App extends Component {
  render() {
    return (
      <Router>

        <Switch>

          <Route exact path="/" component={Home}/>
          <Route path="/lobby" component={Lobby}/>
          <Route path="/login" component={Login}/>
          <Route path ="/tutorial" component={Tutorial}/>
          <Route path ="/waiting" component={Waiting}/>
          <Route path = "/waitingQuestions" component={WaitingQuestions}/>
          <Route path = "/answerQuestions" component={AnswerQuestions}/>

        </Switch>

      </Router>
    );
  }
}
