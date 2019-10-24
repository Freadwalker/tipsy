import React, { Component } from 'react'
import './login.scss'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs'

export default class login extends Component {
    constructor(){
        super();
        this.state={
            username:"",
            pin:""
        }

        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        
        if(this.state.username===""||this.state.pin===""){
            return
        }
        axios({
            method: "POST",
            data:qs.stringify(this.state),
            url:"http://localhost:3001/login",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res=>{
        
            // this.props.history.push("/lobby")
        })
        .catch(err=>{
            
        })
    //     axios.post(`http://localhost:3001`)

    //     .then(res=>{
    //       alert(res.data)
    //    })
    //    .catch(err => console.log(err))
}
    
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {

        return (
            <div id="login-container">
                    <form onSubmit={this.handleSubmit} id="login-controls"> 

                        <input class="input" value={this.state.username} onChange={this.handleChange} 
                        name="username" id="username-input" placeholder="Username"/>

                        <input class="input"  value={this.state.pin} onChange = {this.handleChange}
                         name="pin" id="pin-input" placeholder ="GamePIN"/>
                         
                        <button type = "submit" id="submit-button">Join Lobby</button>
                    </form>
            </div>
        )
    }
}
