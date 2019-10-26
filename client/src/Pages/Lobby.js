import React, { Component } from "react";
import "./lobby.scss";
import Tutorial from "./tutorial";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";

export default class Lobby extends Component {
  state = {
    pin: Math.floor(Math.random() * 90000) + 10000,
    players: []
  };

  componentDidMount() {
    const socket = io("localhost:3001/lobby");
    const pin = this.state.pin;
    debugger;

    socket.emit("join-room", { pin: pin });

    socket.on(`${this.state.pin}`, data => {

      socket.on("player.joined", data => {

        debugger;
        let newPlayers = [...this.state.players];
        debugger;
        newPlayers.push(data.username);
        this.setState({ players: newPlayers });
      });
    });
    // socket.on("player-joined", data => {
    //   debugger;
    //   let newPlayers = [...this.state.players];
    //   debugger;
    //   newPlayers.push(data.username);
    //   this.setState({ players: newPlayers });
    // });
    socket.on("player-joined", data => {
      debugger
      this.setState({
          players: [...this.state.players, data.username]
      })
  })        
  }

  render() {
    return (
      <div id="lobby-container">
        <h1 class="lobbyHeader">Lobby</h1>
        <div class="lobby-key">
          <span>Lobby Key: </span>
          {this.state.pin}
        </div>

        <ul class="playerList">{this.state.players.map}</ul>
        <Link to="/tutorial">
          {" "}
          <button id="start-game-button">Start Game</button>
        </Link>
      </div>
    );
  }
}
