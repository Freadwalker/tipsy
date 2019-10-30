import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";
import io from "socket.io-client";




function questionsDisplay(number){

  return(
        
    <div class="questionsAndAnswers"><h1>
    {this.state.roundOne[number].question}
    
    </h1> <h2>{this.state.roundOne[number].player1} says:      
      {this.state.roundOne[number].answer1}</h2><h2>{this.state.roundOne[number].player2}   
      says:   
        {this.state.roundOne[number].answer2}</h2></div>
        
        )
    
}


function questionsAndAnswers(question,answerObjectArray){

    let questionPackage={question:question,player1:"",player2:"",answer1:"",answer2:""}
    
    let count =0;
  
      for(let i = 0; i < answerObjectArray.length;i++){
    if(answerObjectArray[i].questionOne===question){
      
      if(count===0){
        questionPackage.player1=answerObjectArray[i].answeredBy;
        questionPackage.answer1=answerObjectArray[i].answerOne;
        count++;
      }
      if(count===1){
        questionPackage.player2=answerObjectArray[i].answeredBy;
        questionPackage.answer2=answerObjectArray[i].answerOne
      }
    }else if(answerObjectArray[i].questionTwo===question){
         if(count===0){
        questionPackage.player1=answerObjectArray[i].answeredBy;
        questionPackage.answer1=answerObjectArray[i].answerTwo;
        count++;
      }
      if(count===1){
        questionPackage.player2=answerObjectArray[i].answeredBy;
        questionPackage.answer2=answerObjectArray[i].answerTwo
      }
    }
        
    }
    return questionPackage
  }

  function arrayOfQuestionsAndAnswers(questionArray,answerArray){
  
    let arrayOfQuestionsAndAnswers=[];
    for(let i = 0; i<questionArray.length;i++){
        arrayOfQuestionsAndAnswers.push(questionsAndAnswers(questionArray[i],answerArray));
    }
    return arrayOfQuestionsAndAnswers;
}




export default class voteScreen extends Component {
  constructor(props)
   {
     super(props);
     this.state={
        roundOne:null,
        roundTwo:null,
        rountThree:null,
        questionCount:0
     }
    }
    componentDidMount(){
      debugger
        const socket = io(`10.10.20.31:3001/game`)
        const pin = localStorage.getItem("pin")
        const points=100;
        socket.emit("join",{pin});
        setTimeout(()=>{ socket.emit("toVoting",{pin})},1000)
       

       let questionArrayOne = localStorage.getItem("questionsRoundOne")
    //    const questionArrayTwo =JSON.parse(localStorage.getItem("questionsTwo"));
    //    const questionArrayThree = JSON.parse(localStorage.getItem("questionsThree"));
      debugger
       let answersArrayOne= localStorage.getItem("answersOne")
    //    const answersArrayOne=JSON.parse(localStorage.getItem("answersTwo")); 
    //    const answersArrayOne=JSON.parse(localStorage.getItem("answersTwo")); 
    debugger
        questionArrayOne=questionArrayOne.split(",");
        answersArrayOne=answersArrayOne.split(",");
        answersArrayOne=JSON.parse(answersArrayOne);
        debugger
       let roundOneArray = arrayOfQuestionsAndAnswers(questionArrayOne,answersArrayOne)
        this.setState({roundOne:roundOneArray})
        let count = 0;
        let players=localStorage.getItem("players");
        players=players.split(",");
        let intervalID=setInterval(()=>{
          if(players.length-1===count){
           clearInterval(intervalID);
           this.props.history.push("/scoreScreen");
          }

          count++;
          this.setState({questionCount:count})
          socket.emit("nextQuestion",{pin})
        },15000)
        let playerScore=JSON.parse(localStorage.getItem("playerScore"))
        socket.on("voteFirst",()=>{
          debugger
          playerScore[this.state.roundOne[this.state.questionCount].player1]+=points;
          localStorage.setItem("playerScore",JSON.stringify(playerScore))
        })
        socket.on("voteSecond",()=>{
          playerScore[this.state.roundOne[this.state.questionCount].player2]+=points
          debugger
          localStorage.setItem("playerScore",JSON.stringify(playerScore))
        })
        
    }

    showQuestion(){
        if(this.state.roundOne){
          
          
        return(            <div class="questionsAndAnswers">
        <h1>
{this.state.roundOne[this.state.questionCount].question}

</h1> <h2>{this.state.roundOne[this.state.questionCount].player1} says:      
  {this.state.roundOne[this.state.questionCount].answer1}</h2><h2>{this.state.roundOne[this.state.questionCount].player2}   
  says:   
    {this.state.roundOne[this.state.questionCount].answer2}</h2></div>)
        }
    }
    
    render() {
        return (
            <div id="vote-screen-container">

            {this.showQuestion()}
        
            </div>
        )
    }
}
