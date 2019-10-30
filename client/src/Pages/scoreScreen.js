import React, { Component } from 'react'

export default class scoreScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            players:localStorage.getItem("players").split(","),
            count:0,
            score:JSON.parse(localStorage.getItem("playerScore"))
        }
    }
    // showScore(number){
    //     let score = JSON.parse(localStorage.getItem("playerScore"));
    //     let players=localStorage.getItem("players");
    //     players=players.split(",");
    //     let length = player.length;
        
    //         return(<div class="playerAndScore">{ players[i] } <span>has a score of:</span>
    //          <span>{score[players[i]]}</span></div>)

    // }
    render() {
        return (
            <div>
                <h1>These are the scores! </h1>
                {this.state.players.map(element=>{
                    return(
             <div class="playerAndScore"> { element } <span>has a score of:</span>
             <span>{this.state.score[element]}</span> </div>
                      )  })}
            </div>
        )
    }
}
