import React, { Component } from 'react'
import io from "socket.io-client";
import "./votingPlayer.scss"

export default class voting extends Component {
    constructor(props){
        super(props);
        this.state={
            show:true
        }

    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const pin = localStorage.getItem("pin");
        const socket = io(`10.10.20.31:3001/game`);
        socket.emit("voteFirst",{pin});
        this.setState({show:false})
    }

    handleAlternate=(e)=>{
        e.preventDefault();
        const pin = localStorage.getItem("pin");
        const socket = io(`10.10.20.31:3001/game`);
        socket.emit("voteSecond",{pin});
    }
    componentDidMount(){
        const socket = io("10.10.20.31:3001/game");
        const pin = localStorage.getItem("pin");
        socket.emit("join",{pin:pin})

        socket.on("nextQuestion",()=>{
            this.setState({show:true});
        })
    }
    render() {
        return (
            <div>
                <h1 class="voteHeader">Vote for the funniest answer!</h1>
                {this.state.show?<div class="buttonContainer">
                <form onSubmit={this.handleSubmit.bind(this)}>

                <button class="buttonOne"type="submit">First Answer</button>
                
    </form>
    <button class="buttonTwo" onClick={this.handleAlternate.bind(this)}>Second Answer</button></div>:null}
            </div>
        )
    }
}
