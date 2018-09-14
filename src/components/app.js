import React, { Component } from "react";
import Picker from "./picker";
import { Button } from "./button";
import Clock from "./clock";
import { ChangeDate } from "./changeDate";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false
    }
    this.renderItems = this.renderItems.bind(this);
  }

  renderItems() {
    if(this.state.active) {
      return [
        <Clock/>,
        ChangeDate('Change Date', () => this.setState({ active: false }))
      ]
    } else {
      return Button("Generate Countdown", () => this.setState({ active: true }))
    }
  }

  render() {
    
    return (
      <div className="grid">
        <h2 className="grid__title">Birthday Countdown</h2>

        <div className="grid__skew-dark-one-box" />
        <div className="grid__skew-dark-two" />

        <div className="grid__skew-light-one" />
        <div className="grid__skew-light-two" />
        <div className="grid__skew-light-three-box" />

        <Picker />        
        {this.renderItems()}
      </div>
    );
  }
}
