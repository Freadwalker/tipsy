import React, { Component } from 'react'
import "./endscreen.scss"
import {Link} from 'react-router-dom'
export default class endscreen extends Component {
    render() {
        return (
            <div id="endscreen-container">

                <h1 class="endscreenHeader">Thank you for Playing!  </h1>
                <p class="endscreenMessage">Not tipsy enough yet?</p>
                <Link to="/" class="button backButton"> Back to Start!</Link>
            </div>
        )
    }
}
