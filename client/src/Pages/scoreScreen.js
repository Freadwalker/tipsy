import React, { Component } from 'react'
import "./scoreScreen.scss"
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
        this.id=setTimeout(()=>{
            this.props.history.push("/waitingQuestions")
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
