import React, { Component } from 'react'
import './login.scss'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default class login extends Component {
    constructor(){
        super();
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit=(e)=>{

    }
    
    handleChange=(e)=>{

    }
    render() {
        return (
            <div id="login-container">
                    <form onSubmit={this.handleSubmit} id="login-controls">
                        <input onChange={this.handleChange} class="input" id="username-input"placeholder="Username"/>
                        <input onChange={this.handleChange} class="input" id="pin-input"placeholder ="Game PIN"/>
                        <button type = "submit" id="submit-button">Join Lobby</button>
                    </form>
            </div>
        )
    }
}
