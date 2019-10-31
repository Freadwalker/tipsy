import React, { Component } from 'react'
import './tutorial.scss'    
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";

export default class Tutorial extends Component {
  state={
    redirect : false
  }
  componentDidMount(){
    const socket = io(`10.10.20.31:3001/game`);
    const pin = localStorage.getItem("pin")

    this.id = setTimeout(() => { 
      
      this.setState({ redirect: true })

  },10500)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {

    return (
        <div id="tutorial-container">
        <p class="tutorialText">Get your drinks ready! The Game consists of 3 rounds. 
        First answer the questions, then vote for the best answers. The losers have to drink!</p>
        {this.state.redirect
            ? <Redirect to="/waitingQuestions" />
            : null}
        </div>
     
    )
    
  }
}