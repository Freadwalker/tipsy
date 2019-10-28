import React, { Component } from 'react'   
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";

export default class AnswerQuestions extends Component {
  state={
    redirect : false,
    questionOne:null,
    questionTwo:null
  }

  componentDidMount(){

    const socket = io("localhost:3001/game");
    const pin = localStorage.getItem("pin");
    const username = localStorage.getItem("username")
    socket.emit("join",{pin:pin});
    socket.on("questionsOne",data=>{
      this.setState({questionOne:data})
    })

  }
  
  render() {

    return (
        <div id="answer-container">
        <p class="answerText"></p>

        <h1>This is a test question, so how are you doing?</h1>

        {this.state.redirect
            ? <Redirect to="/waiting" />
            : null}
        </div>
     
    )
    
  }
}