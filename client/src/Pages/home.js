import React, { Component } from 'react'
import './home.scss'    
import {BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
export default class Home extends Component {
  render() {
    return (
      <div id="home-container">
        <h1 class="mainHeader"><span id="T">T</span>  <span id="I">I</span>  <span id="P">P</span>  <span id="S">S</span> <span id="Y">Y</span></h1>

        <div id="home-controls">

        <Link to="/lobby" id ="create-button" class="button linkButton"> Create</Link>
        <Link to="/login" id ="join-button" class="button linkButton"> Join</Link>
        </div>  

      </div>
    )
  }
}
