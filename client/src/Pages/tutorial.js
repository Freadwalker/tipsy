import React, { Component } from 'react'
import './tutorial.scss'    

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Tutorial extends Component {
    
  render() {
    return (
        <div id="tutorial-container">
        <p class="tutorialText">Get your drinks ready! The Game consists of 3 rounds. 
        First answer the questions, then vote for the best answers. The losers have to drink!</p>
        </div>
    )
  }
}