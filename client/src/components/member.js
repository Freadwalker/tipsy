import React, { Component } from 'react'

export default class member extends Component {
    constructor(){
        super();
        this.state={
            member=this.props.name
        }
    }
    render() {
        return (
          <li class="member-li">
              {this.state.member}
          </li>
        )
    }
}
