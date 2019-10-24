import React, { Component } from "react";
import "./lobby.scss";
import Tutorial from "./tutorial";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";

export default class Lobby extends Component {
  state = {
    pin: this.generateRandomKey(),
    players: []
  };

  generateRandomKey() {
    let i = Math.floor(Math.random() * 89999) + 10000;
    return i;
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3001/lobby/${this.state.pin}`)
      .then(res => {
        const socket = io(`${process.env.REACT_APP_API}/${this.state.pin}`);

        
        socket.on("signup", data => {
          debugger
          this.setState({players:data})
        })

        

      })
      .catch(err => {
        debugger
        console.log(err)
      });


  }
  render() {
    return (
      <div id="lobby-container">
        <h1 class="lobbyHeader">Lobby</h1>
        <div class="lobby-key">
          <span>Lobby Key: </span>
          {this.state.pin}
        </div>

        <ul class="playerList">
          {this.state.players.map}
        </ul>
        <Link to="/tutorial">
          {" "}
          <button id="start-game-button">Start Game</button>
        </Link>
      </div>
    );
  }
}
