import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./Pages/home";
import Lobby from "./Pages/Lobby";
import Login from "./Pages/login";
import Tutorial from "./Pages/tutorial";
import Waiting from "./Pages/waiting";
import WaitingQuestions from "./Pages/waitingQuestions";
import AnswerQuestions from "./Pages/answerQuestions";
import votingHost from "./Pages/votingHost";
import votingPlayer from "./Pages/votingPlayer";
import scoreScreen from "./Pages/scoreScreen";
import endscreen from "./Pages/endscreen";

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
          <Route exact path = "/votingHost" component = {votingHost}/>
          <Route exact path = "/votingPlayer" component = {votingPlayer}/>
          <Route path = "/scoreScreen" component = {scoreScreen}/>
          <Route path = "/endscreen" component = {endscreen}/>
          
        </Switch>

      </Router>
    );
  }
}
