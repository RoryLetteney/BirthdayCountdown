import React, { Component } from "react";
import Picker from "./picker";
import { Button } from "./button";
import Clock from "./clock";
import { ChangeDate } from "./changeDate";
import { LargeText } from "./largeText";

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
        ChangeDate('Change Date', () => this.setState({ active: false })),
        LargeText('04/03'),
        <label className="grid__remaining">remaining until your 29th birthday</label>
      ]
    } else {
      return [
        <Picker/>,
        Button("Generate Countdown", () => this.setState({ active: true }))
      ]
    }
  }

  render() {
    
    return (
      <div className="grid">
        <h2 className="grid__title">Birthday Countdown</h2>

        <div className="grid__skew-dark-two" />

        <div className="grid__skew-light-one" />
        {/* <div className="grid__skew-light-two" />
        <div className="grid__skew-light-three-box" /> */}
      
        {this.renderItems()}
      </div>
    );
  }
}
