import React, { Component } from 'react'   
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";
let count = 0;
export default class AnswerQuestions extends Component {
  state={
    redirect : false,
    questionOne:null,
    questions:null,
    questionTwo:null
  }

  componentDidMount(){

    const socket = io("10.10.20.31:3001/game");

    const pin = localStorage.getItem("pin");
    const username = localStorage.getItem("username");

    socket.emit("join",{pin:pin});

    socket.on("questionsOne",data=>{

      debugger
      this.setState({questions:data[username]})
      debugger
    })

  }

  handleChange=(e)=>{
    e.preventDefault();
    if(count===0){
      this.setState({questionOne:e.target.value})
    }else if(count ===1){
      this.setState({questionTwo:e.target.value})
    }
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    count++;

  }
  showQuestion=()=>{
    if(this.state.questions&&this.state.questionOne){
      return(`<h1>${this.state.questions[1]}</h1>`)
    }else if(this.state.questions){
      return(`<h1>${this.state.questions[0]}</h1>`)
    }else{
      return null
    }
  }
  render() {

    return (
        <div id="answer-container">
        <p class="answerText"></p>

        <h1>This is a test question, so how are you doing?</h1>
        { this.state.questions&&this.state.questionOne?<h1>{this.state.questions[1]}</h1> :null}

        <form onSubmit={this.handleSubmit} id="submit-answer">

                  <input
            class="input"
            onChange={this.handleChange}
            name="answer"
            id="answer-input"
            placeholder="type your answer here..."
          />

        </form>

        {this.state.redirect
            ? <Redirect to="/waiting" />
            : null}
        </div>
     
    )
    
  }
}