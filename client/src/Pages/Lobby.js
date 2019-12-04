import React, { Component } from "react";
import "./lobby.scss";
import Tutorial from "./tutorial";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";

function createPlayerScore(array){
let object ={}

for(let i = 0;i < array.length;i++){
  object[array[i]]=0;
}
return object 
}
let questions=[
  
  "The worst life decision one could make?",
  "Hey Baby come back to my place and I show you______",
  "I drink to forget_____",
  "Coming to Cinema this Season______ The Movie.",
  "It's a pity that kids these days all get involved with____",
  "The class trip field was completely ruined by_______",
  "But before I kill you Mr.Bond I must show you_____",
  "After the earthquake Sean Penn brought_______to the people in Haiti.",
  "During Sex I like to think about _______",
  "In the new Disney Channel Movie Hannah Montana struggles with _______",
  "A romantic candlelight dinner would be incomplete without _______",
  "Next from J.K. Harry Potter and the Chamber of _______",
  "Instead of coal Santa now gives the bad children ________",
  "I always carry_______ in my purse.",
  "Sometimes I just look at the kids and I think______",
  "What's your favorite kind of torture?",
  "10% of adults admit to having an addiction to _______",
  "I'm sorry professor but I couldn't complete my homework because of _______",
  "The last thing you see before you die",
  "What's the next Happy Meal Toy?",
  "What gives me uncontrollable Gas?",
  "TSA guidelines now prohibit ______ on airplanes.",
  "A double rainbow doesn't have gold at the end of it. Instead it has _______",
  "Really awful cheerleaders would yell _________!",
  "You know you're old when you're at a bar and the bartender asks you ________",
  "A terrible name for a clown",
  "Name a children book by someone who hates children",
  "The worst halloween costume for a child",
  "When I'm rich my mansion will have a room called The ________ Room",
  "The dumbest person in the history of all Time",
  "The biggest downside to living in Hell",
  " Jesus's REAL last words",
  "The worst thing for an evil witch to turn you into",
  "The Skittles flavor that just missed the cut",
  "On your wedding night it would be horrible to find out that the person you married is______",
  " A name for a really bad Broadway musical",
  "The first thing you would do after winning the lottery",
  " What's actually causing global warming?",
  "Something squirrels probably do when no one is looking",
  "The crime you would commit if you could get away with it",
  "What's the Mona Lisa smiling about?",
  "A terrible name for a cruise ship",
  "Come up with a title for an adult version of any classic video game",
  "Something you should never put on an open wound",
  "The real reason the dinosaurs died",
  "A college major you don't see at many universities",
  "What would make baseball more entertaining to watch?",
  "The best thing about going to prison",
  "What would you do if you were left alone in the White House for an hour?",
  "A better name for testicles",
  "What's the first thing you would do if you could time travel?",
  "The name of a pizza place you should never order from",
  "Come up with a name for a beer made especially for monkeys",
  "The worst way to be murdered",
  "Something you shouldn't get your significant other for Valentine's Day",
  "A dangerous thing to do while driving",
  " What's wrong with these kids today?",
  "Invent a holiday that you think everyone would enjoy",
  "The best news you could get today",
  "The worst thing you could stuff a bed mattress with",
  "A great opening line to start a conversation with a stranger at a party",
  "Something you would like to fill a swimming pool with",
  "Sometimes after a long day you just need to________",
  "The best place to bury all those bodies",
  "One place a finger shouldn't go",
  "What's lurking under your bed when you sleep?",
  "A good fake name to use when checking into a hotel",
  "The hardest thing about being Batman",
  "Something you should never say to your mother",
  "The best thing to use when you're out of toilet paper",
  "The worst thing you could discover in your burrito",
  "One thing never to do on a first date",
  "Something it'd be fun to throw off the Eiffel Tower",
  " A new ice cream flavor that no one would ever order",
  "A fun thing to yell as a baby is being born",
  "The worst family secret that could come out over Thanksgiving dinner",
  "Something you'd probably find a lot of in God's refrigerator",
  "People wouldn't respect He-Man as much if to gain his power he held up his sword and shouted ____________________",
  "Pants would be a whole lot better if they ______",
  "What the Statue of Liberty is hiding beneath that robe",
  "There's only one time that murder is acceptable and that is when _______",
  


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
      players: [],
      error:false

    };
  }



  handleSubmit=(e)=>{
      e.preventDefault();
      if(this.state.players.length<3){
        this.setState({error:true})
        return
      }
      localStorage.setItem("playerCount",this.state.players.length)
      localStorage.setItem("players",this.state.players)
      localStorage.setItem("playerScore",JSON.stringify(createPlayerScore(this.state.players)))

      let questionsArrayGame=createQuestions(this.state.players.length,questions);
      const questionsRoundOne=questionsArrayGame[0];
      const questionsRoundTwo=questionsArrayGame[1];
      const questionsRoundThree=questionsArrayGame[2];

      localStorage.setItem("questionsRoundOne",questionsRoundOne);
      localStorage.setItem("questionsRoundTwo",questionsRoundTwo);
      localStorage.setItem("questionsRoundThree",questionsRoundThree);
      localStorage.setItem("actualRound","one");

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
    const socket = io(`${process.env.REACT_APP_API}/lobby`);
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
        <div id="lobby-key">
          <span>Lobby Key: </span>
          {this.state.pin}
        </div>

        <ul class="playerList">
        
        {this.state.players.map(player=>{
          return(<li class="player">{player}</li>)
        })}

        </ul>
        <form onSubmit={this.handleSubmit} id="login-controls">
        {this.state.error?<div>There have to be at least 3 Players in the lobby to start!</div>:null}
        <button id="start-game-button">Start Game</button>
        
        </form>
        
         
        
      </div>
    );
  }
}
