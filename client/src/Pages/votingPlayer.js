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
        const socket = io(`${process.env.REACT_APP_API}/game`);
        const username = localStorage.getItem("username");

        let votePacket = {pin:pin,username:username}

        socket.emit("voteFirst",votePacket);

        this.setState({show:false})
    }

    handleAlternate=(e)=>{

        e.preventDefault();

        const pin = localStorage.getItem("pin");
        const socket = io(`${process.env.REACT_APP_API}/game`);
        const username = localStorage.getItem("username");

        let votePacket = {pin:pin,username:username}

        socket.emit("voteSecond",votePacket);

        this.setState({show:false})
    }
    componentDidMount(){
        const socket = io(`${process.env.REACT_APP_API}/game`);
        const pin = localStorage.getItem("pin");
        socket.emit("join",{pin:pin})

        socket.on("nextQuestion",()=>{
            this.setState({show:true});
        })
        socket.on("toScoreScreen",()=>{
            this.props.history.push("/waiting");
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
