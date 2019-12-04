import React, { Component } from 'react'
import "./scoreScreen.scss"
import io from "socket.io-client";
import beer from "./beer.png"
import score from "./score.png"
export default class scoreScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            players:localStorage.getItem("players").split(","),
            count:0,
            score:[],
            drinks:[]
        }
    }
    componentDidMount(){
        const socket = io(`${process.env.REACT_APP_API}/game`);
        const pin = localStorage.getItem("pin");
        socket.emit("join",{pin});
        let object =JSON.parse(localStorage.getItem("playerScore"));

        var sortable = [];
        for (var user in object) {
            sortable.push([user, object[user]]);
        }
      
        sortable.sort(function(a, b) {
            return b[1] - a[1];
      
        });

        this.setState({score:sortable})

        let drinkArray=[];

        drinkArray.push(sortable[sortable.length-1][0])
        drinkArray.push(sortable[sortable.length-2][0])
        drinkArray.push(sortable[sortable.length-3][0])
        this.setState({drinks:drinkArray});

        let actualRound= localStorage.getItem("actualRound")
        this.id=setTimeout(()=>{
            
            if(actualRound==="one"){
                localStorage.setItem("actualRound","two")
                this.props.history.push("/waitingQuestions")
            }else if(actualRound==="two"){
                localStorage.setItem("actualRound","three")
                this.props.history.push("/waitingQuestions")
            }else if(actualRound==="three"){
                this.props.history.push("/endscreen")
            }
        },30000)
    }

    componentWillUnmount() {

        clearTimeout(this.id)

      }
    render() {
        return (
            <div class="scoreContainer">
            
                <h1 class="scoreHeader"><img src={score} class="scoreImage"/> </h1>
                <ol class="scoreDisplay">

                {this.state.score.map(element=>{

                    return(
              
                 <li class="playerAndScore">{element[0]} : {element[1]}</li> 
                      )})}
                            </ol>
                  <div class="loserContainer">
                 <div class="needsDrink"> <p>{this.state.drinks[0]}:</p><img src={beer} class="beerImage" /><img src={beer} class="beerImage" /><img src={beer} class="beerImage" /></div>          
                 <div class="needsDrink"> <p>{this.state.drinks[1]}:</p><img src={beer} class="beerImage" /><img src={beer} class="beerImage" /></div>          
                 <div class="needsDrink"> <p>{this.state.drinks[2]}:</p><img src={beer} class="beerImage" /></div>          
                 </div>
                
            </div>
        )
    }
}
