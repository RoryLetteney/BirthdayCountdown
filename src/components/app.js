import React, { Component } from "react";
import Picker from "./picker";
import { Button } from "./button";
import Clock from "./clock";
import { ChangeDate } from "./changeDate";
import { LargeText } from "./largeText";
import moment from 'moment';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      startDate: moment(),
      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
    this.renderItems = this.renderItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  handleChange(date) {
    console.log("APP JS HANDLE CHANGE", date._d);
    this.setState({ startDate: date });
  }

  handleGenerate() {
    this.setState({ active: true })

    var countDownDate = this.state.startDate.toDate().getTime();
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;

      var days = Math.floor(distance/(1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const time = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      
      this.setState({
        timeRemaining: {
          days,
          hours,
          minutes,
          seconds
        }
      })
      
      console.log(this.state.timeRemaining);

      if (distance < 0) {
        clearInterval(x);
      }
    }, 1000);
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
        <Picker startDate={this.state.startDate} callback={(date) => this.handleChange(date)}/>,
        Button("Generate Countdown", () => this.handleGenerate())
      ]
    }
  }

  render() {
    
    return (
      <div className="grid">
        <h2 className="grid__title">Birthday Countdown</h2>
        <div className="grid__skew-dark" />
        <div className="grid__skew-light" />      
        {this.renderItems()}
      </div>
    );
  }
}
