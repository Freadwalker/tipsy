import React, { Component } from "react";
import "./login.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";

export default class login extends Component {
  constructor(props) {
    super(props);
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
    const socket = io(`${process.env.REACT_APP_API}/lobby`);
    
    socket.emit("signup", player);

    localStorage.setItem("Host",false)
    localStorage.setItem("username",this.state.username);
    localStorage.setItem("pin",this.state.pin)
    this.props.history.push("/waiting");

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

          <button type="submit" id="submit-button-login">
            Join Lobby
          </button>
        </form>
      </div>
    );
  }
}
