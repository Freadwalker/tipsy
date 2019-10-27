import React, { Component } from 'react'   
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";

export default class AnswerQuestions extends Component {
  state={
    redirect : false
  }
  componentDidMount(){

    const socket = io("localhost:3001/lobby");
    const pin = localStorage.getItem("pin");

  }

  render() {

    return (
        <div id="waiting-container">
        <p class="waitingText"></p>
        {this.state.redirect
            ? <Redirect to="/waiting" />
            : null}
        </div>
     
    )
    
  }
}