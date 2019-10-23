import React, { Component } from 'react'
import './lobby.scss'    

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Lobby extends Component {
    state={
        lobbykey:this.generateRandomKey(),
        users:[]
    }

    generateRandomKey(){
            let i=Math.floor(Math.random()*89999)+10000
            return i;
    }

  render() {
    return (
        
      <div id="lobby-container">
        <h1 class="lobbyHeader">Lobby</h1>
        <div class="lobby-key"><span>Lobby Key: </span>{this.state.lobbykey}</div>       
        
        <ul class="playerList">
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        </ul>
        <Link to="/tutorial1"> <button id="start-game-button">Start Game</button></Link>
      </div>
    )
  }
}