import React, { Component } from "react";
import Picker from "./picker";
import { Button } from "./button";
import Clock from "./clock";
import { ChangeDate } from "./changeDate";
import { LargeText } from "./largeText";
import moment from "moment";
import ordinal from "ordinal-js"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.timer = 0;

    this.state = {
      active: false,
      startDate: moment(),
      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      age: 0
    };
    this.renderItems = this.renderItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.getBirthDate = this.getBirthDate.bind(this);
  }

  handleChange(date) {
    console.log("APP JS HANDLE CHANGE", date._d);
    clearInterval(this.timer);
    this.setState({ startDate: date });
  }

  handleGenerate() {  

    var bday = this.state.startDate.toDate();
    var today = new Date();
    var currentMonth = today.getMonth();
    var birthMonth = bday.getMonth();

    var timeBetween = today.getTime() - bday.getTime();
    var daysOld = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
    var age = Number((daysOld/365).toFixed(0));
    this.setState({
      age,
      active: true
    })

    if (birthMonth > currentMonth) {
      bday.setFullYear(today.getFullYear());
    } else if (birthMonth < currentMonth) {
      bday.setFullYear(today.getFullYear() + 1);
    } else if (birthMonth == currentMonth) {
      var currentDay = today.getDate();
      var birthDay = bday.getDate();

      if (birthDay > currentDay) {
        bday.setFullYear(today.getFullYear());
      } else if (birthDay <= currentDay) {
        bday.setFullYear(today.getFullYear() + 1);
      }
    }

    var countDownDate = bday.getTime();
    this.timer = setInterval(function() {
      var now = today.getTime();
      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
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
      });

      if (distance < 0) {
        clearInterval(this.timer);
      }
    }.bind(this), 1000);
  }

  getBirthDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (month < 10) {
      return `0${month}/${day}`
    } else {
      return `${month}/${day}`
    }
    
  }

  renderItems() {
    if (this.state.active) {
      return [
        <Clock key={0} timeRemaining={this.state.timeRemaining} />,
        ChangeDate("Change Date", () => this.setState({ active: false })),
        LargeText(this.getBirthDate(this.state.startDate.toDate())),
        <label key={3} className="grid__remaining">
          remaining until your {ordinal.toOrdinal(this.state.age)} birthday
        </label>
      ];
    } else {
      return [
        <Picker
          startDate={this.state.startDate}
          callback={date => this.handleChange(date)}
          key={0}
        />,
        Button("Generate Countdown", () => this.handleGenerate())
      ];
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
