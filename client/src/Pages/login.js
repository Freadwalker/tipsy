import React, { Component } from "react";
import "./login.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import io from "socket.io-client";

export default class login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      pin: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.username === "" || this.state.pin === "") {
      return;
    }


    const player = { username: this.state.username, pin: this.state.pin };
    const socket = io(`10.10.20.31:3001/lobby`);
    
    socket.emit("signup", player);
    localStorage.setItem("host",false)
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div id="login-container">
        <form onSubmit={this.handleSubmit} id="login-controls">
          <input
            class="input"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            id="username-input"
            placeholder="Username"
          />

          <input
            class="input"
            value={this.state.pin}
            onChange={this.handleChange}
            name="pin"
            id="pin-input"
            placeholder="GamePIN"
          />

          <button type="submit" id="submit-button">
            Join Lobby
          </button>
        </form>
      </div>
    );
  }
}
