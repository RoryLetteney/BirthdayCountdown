import React, { Component } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";

import 'react-datepicker/dist/react-datepicker.css';

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.callback(date)
  }

  render() {
    return (
      <div className="picker">
        <DatePicker
          selected={this.props.startDate}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
