import React, { Component } from 'react'
import './tutorial.scss'    

import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";

export default class Tutorial extends Component {
  state={
    redirect : false
  }
  componentDidMount(){
    this.id = setTimeout(() => this.setState({ redirect: true }), 10000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {

    return (
        <div id="tutorial-container">
        <p class="tutorialText">Get your drinks ready! The Game consists of 3 rounds. 
        First answer the questions, then vote for the best answers. The losers have to drink!</p>
        {this.state.redirect&&localStorage.getItem("Host")
            ? <Redirect to="/lobby" />
            :this.state.redirect?<Redirect to="/" /> :null }
        </div>
     
    )
    
  }
}