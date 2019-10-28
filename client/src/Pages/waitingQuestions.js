import React, { Component } from 'react'
import './waitingQuestions.scss'    
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";

export default class WaitingQuestions extends Component {

  state={
    redirect : false
  }
  componentDidMount(){
  const socket= io(`10.10.20.31:3001/game`);
  const pin = localStorage.getItem("pin");
  const gameQuestionsOne= JSON.parse(localStorage.getItem("questionsOne"));

  gameQuestionsOne["pin"]=pin;

  setTimeout( ()=>{socket.emit("questionsGameOne",gameQuestionsOne)},2000)

  }

  render() {

    return (
        <div id="waiting-questions-container">
        <p class="waitingQuestionsext">
        Answer the questions on your phone!
      
        
        </p>
        {this.state.redirect
            ? <Redirect to="/lobby" />
            : null}
        </div>
     
    )
    
  }
}