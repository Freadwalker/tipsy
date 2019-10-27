import React, { Component } from 'react'
import './waitingQuestions.scss'    
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";

export default class WaitingQuestions extends Component {

  state={
    redirect : false
  }
  componentDidMount(){

  }

  render() {

    return (
        <div id="waiting-questions-container">
        <p class="waitingQuestionsext">

        Enter your questions on your device!
        
        </p>
        {this.state.redirect
            ? <Redirect to="/lobby" />
            : null}
        </div>
     
    )
    
  }
}