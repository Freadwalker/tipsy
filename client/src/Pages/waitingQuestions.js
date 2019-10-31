import React, { Component } from "react";
import "./waitingQuestions.scss";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export default class WaitingQuestions extends Component {
  state = {
    redirect: false,
    count: 0
  };
  componentDidMount() {
    debugger
    const socket = io(`10.10.20.31:3001/game`);
    const pin = localStorage.getItem("pin");
    socket.emit("start-game", { pin: pin });
    const gameQuestionsOne = JSON.parse(localStorage.getItem("questionsOne"));
    const gameQuestionsTwo = JSON.parse(localStorage.getItem("questionsTwo"));
    const gameQuestionsThree = JSON.parse(localStorage.getItem("questionsThree"));

    let players = localStorage.getItem("players");
    players = players.split(",");
    
    gameQuestionsOne["pin"] = pin;
    gameQuestionsTwo["pin"] = pin;
    gameQuestionsThree["pin"]= pin;

    let answerInformation = [];
    let count = 0;
    socket.emit("join", { pin: pin });

    socket.on("answersToQuestions", data => {
      count++;
      answerInformation.push(data);
      localStorage.setItem("answersOne", JSON.stringify(answerInformation));
      this.setState({ count: count });
      if (this.state.count === players.length) {
        this.setState({ redirect: true });
      }
    });
    if (localStorage.getItem("actualRound") === "one") {
      setTimeout(() => {
        socket.emit("questionsGameOne", gameQuestionsOne);
      }, 2000);
    } else if (localStorage.getItem("actualRound") === "two") {
      setTimeout(() => {
        socket.emit("questionsGameOne", gameQuestionsTwo);
      }, 2000);
    } else if (localStorage.getItem("actualRound") === "three") {
      setTimeout(() => {
        socket.emit("questionsGameOne",gameQuestionsThree)
      }, 2000);
    }
  }

  render() {
    return (
      <div id="waiting-questions-container">
        <p class="waitingQuestionsext">Answer the questions on your phone!</p>
        {this.state.redirect ? <Redirect to="/votingHost" /> : null}
      </div>
    );
  }
}
