import React, { Component } from 'react'   
import io from "socket.io-client";
import "./answerQuestions.scss"
import { BrowserRouter as Redirect} from "react-router-dom";
let count = 0;
export default class AnswerQuestions extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect : false,
      questionOne:false,
      questions:null,
      questionTwo:null,
      answerOne:null,
      answerTwo:null,
      count:0,
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this)
  }


  componentDidMount(){

    const socket = io(`${process.env.REACT_APP_API}/game`);

    const pin = localStorage.getItem("pin");
    const username = localStorage.getItem("username");

    socket.emit("join",{pin:pin});

    socket.on("questionsOne",data=>{

      this.setState({questions:data[username]})
    
    })

  }

  handleChange=(e)=>{
    e.preventDefault();
    if(this.state.count===0)
    this.setState({answerOne:e.target.value})
    else if(this.state.count===1){
      this.setState({answerTwo:e.target.value})
    }
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    this.setState({questionOne:true})
    
    const socket = io(`${process.env.REACT_APP_API}/game`);
    if(this.state.count===1){
      debugger
      let answers={
        answeredBy:localStorage.getItem("username"),
        questionOne:this.state.questions[0],
        questionTwo:this.state.questions[1],
        answerOne:this.state.answerOne,
        answerTwo:this.state.answerTwo,
        pin:localStorage.getItem("pin")
      }
      debugger
      socket.emit("answersSubmit",answers)
      this.props.history.push("/waiting");
    }
    this.setState({count:1})
    document.getElementById("answer-input").value=""
  }
  showQuestion=()=>{
    
    if(this.state.questions && this.state.questionOne===true){
      return <h1 class="questionHeaderPlayer">{this.state.questions[1]}</h1>
    }else if(this.state.questions){
      return <h1 class="questionHeaderPlayer">{this.state.questions[0]}</h1>
    }else{
      return null
    }
  }

  render() {

    return (
        <div id="answer-container">
        <p class="answerText"></p>

        {this.showQuestion()}

        <form onSubmit={this.handleSubmit} id="submit-answer">

          <input
            class="input"
            onChange={this.handleChange}
            name="answer"
            id="answer-input"
            placeholder="type your answer here..."
            autocomplete="off"
          />

                  <button type="submit" id="submit-button">
            Submit
          </button>
        </form>

        {this.state.redirect
            ? <Redirect to="/waiting" />
            : null}
        </div>
     
    )
    
  }
}