import React from "react";
import { Button, Pane, toaster } from "evergreen-ui";
import ReactInterval from "react-interval";

import "./clicker.css";

// implement achievements
// implement upgrades and their prices
// move automatic clicker into its own component
// add more resources or more upgrades?

export default class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnClicks: 0,
      mainClickIncrement: 1,
      mainClickBuffPrice: 25,
      auto: null,
      autoClickNumber: 0,
      autoClickPrice: 25,
      interval: 2000,
      timer: null,
      enabled: false,
      timeout: 1000,
      numberOfTimers: 0
      // callback: this.mainClick
    };
    // React antics
    this.mainClick = this.mainClick.bind(this);
    this.addTen = this.addTen.bind(this);
    this.addHundred = this.addHundred.bind(this);
    this.buyAutoclick = this.buyAutoclick.bind(this);
    this.shortenAutoClickIntervall = this.shortenAutoClickIntervall.bind(this);
    this.buffMainClick = this.buffMainClick.bind(this);
    this.toast = this.toast.bind(this);
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    //   if (this.state.auto) {
    //     this.setState({
    //       btnClicks: this.state.btnClicks + this.state.autoClickNumber
    //     });
    //   }
    // }, this.state.interval);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  mainClick() {
    this.setState({
      btnClicks: this.state.btnClicks + this.state.mainClickIncrement
    });
  }

  buffMainClick() {
    // user this style here too
    // const {count} = this.state;
    this.setState({
      mainClickIncrement: this.state.mainClickIncrement + 1,
      btnClicks: this.state.btnClicks - this.state.mainClickBuffPrice,
      mainClickBuffPrice: this.state.mainClickBuffPrice + 10
    });
  }

  addTen() {
    this.setState({
      btnClicks: this.state.btnClicks + 10
    });
  }

  addHundred() {
    this.setState({
      btnClicks: this.state.btnClicks + 100
    });
  }

  buyAutoclick() {
    this.setState({
      auto: "one",
      autoClickNumber: this.state.autoClickNumber + 1,
      btnClicks: this.state.btnClicks - this.state.autoClickPrice,
      autoClickPrice: this.state.autoClickPrice + 5,
      enabled: true,
      numberOfTimers: this.state.numberOfTimers + 1
    });
  }

  shortenAutoClickIntervall() {
    // Not working
    this.setState({
      interval: Math.round(this.state.interval / 2),
      btnClicks: this.state.btnClicks - 150
    });
  }

  toast() {
    // Change this to be conditional and dynamic
    toaster.success("Congrats! You're good at clicking virtual buttons!");
  }

  render() {
    // use this style of defining shit from state
    let timers = [];
    for (let i = 0; i < this.state.numberOfTimers; i++) {
      timers.push(
        <ReactInterval
          timeout={this.state.timeout}
          enabled={this.state.enabled}
          callback={this.mainClick}
        />
      );
    }
    return (
      <div>
        <Button marginBottom={20} height={56} onClick={this.mainClick}>
          Click me!
        </Button>
        <div>Clicks: {this.state.btnClicks}</div>

        {/* we need a way to make autoclickers number dynamic */}
        {timers}

        <div>
          {this.state.btnClicks >= 10 ? (
            <Button
              marginBottom={20}
              marginTop={10}
              height={40}
              onClick={this.addTen}
            >
              +10
            </Button>
          ) : (
            <Button
              marginBottom={20}
              marginTop={10}
              height={40}
              disabled={true}
            >
              +10
            </Button>
          )}
        </div>
        <div>
          {this.state.btnClicks >= 100 ? (
            <Button marginBottom={20} height={40} onClick={this.addHundred}>
              +100
            </Button>
          ) : (
            <Button marginBottom={20} height={40} disabled={true}>
              +100
            </Button>
          )}
        </div>

        <div>
          {this.state.btnClicks >= this.state.autoClickPrice ? (
            <Button
              marginBottom={20}
              marginTop={10}
              onClick={this.buyAutoclick}
            >
              auto click +1 (cost: {this.state.autoClickPrice} clicks)
            </Button>
          ) : (
            <Button
              marginBottom={20}
              marginTop={10}
              disabled={true}
              onClick={this.buyAutoclick}
            >
              auto click +1 (cost: {this.state.autoClickPrice} clicks)
            </Button>
          )}
        </div>

        <div>
          {this.state.btnClicks >= this.state.mainClickBuffPrice ? (
            <Button
              marginBottom={20}
              marginTop={10}
              onClick={this.buffMainClick}
            >
              Buff MAIN CLICK (cost: {this.state.mainClickBuffPrice} clicks)
            </Button>
          ) : (
            <Button
              marginBottom={20}
              marginTop={10}
              disabled={true}
              onClick={this.buffMainClick}
            >
              Buff MAIN CLICK (cost: {this.state.mainClickBuffPrice} clicks)
            </Button>
          )}
        </div>

        <div>
          {this.state.btnClicks >= 150 && this.state.auto === "one" ? (
            <Button
              marginBottom={20}
              marginTop={10}
              onClick={this.shortenAutoClickIntervall}
            >
              Shorten auto click interval (Cost: 150)
            </Button>
          ) : (
            <Button
              marginBottom={20}
              marginTop={10}
              disabled={true}
              onClick={this.shortenAutoClickIntervall}
            >
              Shorten autoClick interval
            </Button>
          )}
        </div>
        {this.state.btnClicks === 50 ? this.toast() : ""}
      </div>
    );
  }
}
