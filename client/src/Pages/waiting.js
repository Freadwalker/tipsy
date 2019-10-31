import React, { Component } from 'react'
import './waiting.scss'    
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";

export default class Waiting extends Component {
  state={
    redirectAnswer : false,
    redirectVote:false,
  }
  componentDidMount(){
    const socket = io("10.10.20.31:3001/game");
    const pin = localStorage.getItem("pin");
    this.setState({redirectAnswer:false,redirectVote:false})
    socket.emit("join",{pin:pin})

    socket.on("game-started",data=>{
        this.setState({redirectAnswer:true})
    })
    socket.on("goVoting",()=>{
      this.setState({redirectVote:true})
    })

  }

  render() {

    return (
        <div id="waiting-container">
        <p class="waitingText">Look at the big screen!</p>
        {this.state.redirectAnswer
            ? <Redirect to="/answerQuestions" />
            : null}
            {this.state.redirectVote
            ? <Redirect to="/votingPlayer" />
            : null}
        </div>
     
    )
    
  }
}