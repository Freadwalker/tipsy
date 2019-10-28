import React, { Component } from "react";
import "./lobby.scss";
import Tutorial from "./tutorial";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";

let questions=[
  "When everything else fails I can always masturbate to______",
  "The worst life decision one could make?",
  "Hey Baby come back to my place and I show you______",
  "What brought the Orgy to a grinding halt?",
  "I drink to forget_____",
  "Coming to Cinema this Season______ The Movie.",
  "It's a pity that kids these days all get involved with____",
  "The class trip field was completely ruined by_______",
  "I got 99 problems but _____ ain't one",
  "But before I kill you Mr.Bond I must show you_____",
  "After the earthquake Sean Penn brought_______to the people in Haiti.",
  "During Sex I like to think about _______",
  "In the new Disney Channel Movie, Hannah Montana struggles with _______",
  "A romantic candlelight dinner would be incomplete without _______",
  "Next from J.K. Harry Potter and the Chamber of _______",
  "Instead of coal, Santa now gives the bad children ________",
  "What's worse than the Holocaust?",
  "I always carry_______ in my purse.",
  "Sometimes I just look at the kids and I think______",
  "What's your favorite kind of torture?",
  "10% of adults admit to having an addiction to _______",
  "I'm sorry professor, but I couldn't complete my homework because of _______",
  "The last thing you see before you die",
  "What's the next Happy Meal Toy?",
  "What gives me uncontrollable Gas?",
  "TSA guidelines now prohibit ______ on airplanes."
  ] 

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  function createQuestions(playerCount,questions){

    questions= shuffle(questions);

    let questionsArray=[];
    let firstQuestions=questions.slice(0,playerCount)
    let secondQuestions= questions.slice(playerCount,playerCount+playerCount)
    let thirdQuestions=questions.slice(playerCount+playerCount,playerCount+playerCount+playerCount)

    questionsArray.push(firstQuestions);
    questionsArray.push(secondQuestions);
    questionsArray.push(thirdQuestions);

    return questionsArray

  }
  
function pair(arrayOne,arrayTwo){
  let questions = {}
  for(let i = 0; i <arrayOne.length;i++){
    if(i===arrayOne.length-1){
      questions[arrayOne[i]]=[arrayTwo[i],arrayTwo[0]]
    }else{
      questions[arrayOne[i]]=[arrayTwo[i],arrayTwo[i+1]]
    }
    
  }
  return questions;
}

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
      localStorage.setItem("playerCount",this.state.players.length)
      localStorage.setItem("players",this.state.players)
 

      let questionsArrayGame=createQuestions(this.state.players.length,questions);

      const questionsOne= pair(this.state.players,questionsArrayGame[0])
      const questionsTwo= pair(this.state.players,questionsArrayGame[1])
      const questionsThree= pair(this.state.players,questionsArrayGame[2])




      localStorage.setItem("questionsOne",JSON.stringify(questionsOne));
      localStorage.setItem("questionsTwo",JSON.stringify(questionsTwo));
      localStorage.setItem("questionsThree",JSON.stringify(questionsThree));

      this.props.history.push("/tutorial")
  }

  componentDidMount() {
    //setting up socket and pin
    const socket = io("10.10.20.31:3001/lobby");
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
