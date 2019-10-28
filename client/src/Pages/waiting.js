import React, { Component } from 'react'
import './waiting.scss'    
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";

export default class Waiting extends Component {
  state={
    redirect : false
  }
  componentDidMount(){
    const socket = io("10.10.20.31:3001/game");
    const pin = localStorage.getItem("pin");

    socket.emit("join",{pin:pin})
    socket.on("game-started",data=>{

        this.setState({redirect:true})
    })

  }

  render() {

    return (
        <div id="waiting-container">
        <p class="waitingText">Look at the big screen!</p>
        {this.state.redirect
            ? <Redirect to="/answerQuestions" />
            : null}
        </div>
     
    )
    
  }
}