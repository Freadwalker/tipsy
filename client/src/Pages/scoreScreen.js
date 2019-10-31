import React, { Component } from 'react'
import "./scoreScreen.scss"
import io from "socket.io-client";
export default class scoreScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            players:localStorage.getItem("players").split(","),
            count:0,
            score:JSON.parse(localStorage.getItem("playerScore"))
        }
    }
    componentDidMount(){
        const socket = io(`${process.env.REACT_APP_API}/game`);
        const pin = localStorage.getItem("pin");
        socket.emit("join",{pin});
        let score =localStorage.getItem("players").split(",");

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

        },60000)
    }

    componentWillUnmount() {

        clearTimeout(this.id)

      }
    render() {
        return (
            <div>
                <h1 class="scoreHeader">These are the scores! </h1>
                <ul class="scoreDisplay">

                {this.state.players.map(element=>{

                    return(
              
                 <li class="playerAndScore">{ element } : {this.state.score[element]}</li> 
                      )})}
                            </ul>
                  
                
            </div>
        )
    }
}
