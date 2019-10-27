import React, { Component } from "react";
import "./lobby.scss";
import Tutorial from "./tutorial";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";

export default class Lobby extends Component {
  constructor(props){
    super(props);
    this.state = {
      pin: ""+(Math.floor(Math.random() * 90000) + 10000),
      players: []
    };
  }



  handleSubmit=(e)=>{
      e.preventDefault();
      this.props.history.push("/tutorial")
  }

  componentDidMount() {
    //setting up socket and pin
    const socket = io("localhost:3001/lobby");
    const pin = this.state.pin;
    //saving lobby-pin in localStorage
    localStorage.setItem("pin",pin)
    localStorage.setItem("Host",true)
    //create socket room with lobby-pin
    socket.emit("join-room", { pin: pin })
    //listening for newPlayers
    socket.on("player-joined",data=>{ 
      let newPlayers = [...this.state.players];
      newPlayers.push(data.username);
      this.setState({ players: newPlayers });
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

        <ul class="playerList">
        
        {this.state.players.map(player=>{
          return(<li>{player}</li>)
        })}

        </ul>
        <form onSubmit={this.handleSubmit} id="login-controls">

        <button id="start-game-button">Start Game</button>
        
        </form>
        
         
        
      </div>
    );
  }
}
