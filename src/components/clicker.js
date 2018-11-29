import React from "react";
import { Button, Pane, toaster } from "evergreen-ui";
import ReactInterval from "react-interval";

import "./clicker.css";

// add more resources or more upgrades?

export default class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // main resource
      btnClicks: 0,
      // main button action & price
      mainClickIncrement: 1,
      mainClickBuffPrice: 25,
      // cheap autoclicker counter & price
      autoClickNumber: 0,
      autoClickPrice: 25,
      // better autoclicker counter & price
      betterAutoClickNumber: 0,
      betterAutoClickPrice: 50,
      // not used yet
      interval: 2000,
      // cheap react interval values
      timer: null,
      enabled: false,
      timeout: 1000,
      numberOfTimers: 0,
      // better react interval values
      betterTimer: null,
      betterEnabled: false,
      betterTimeout: 800,
      numberOfBetterTimers: 0,
      // 50 achievement bool
      wereFifty: false,
      // not used yet
      auto: null
    };
    // React antics
    this.mainClick = this.mainClick.bind(this);
    this.addTen = this.addTen.bind(this);
    this.addHundred = this.addHundred.bind(this);
    this.buyAutoclick = this.buyAutoclick.bind(this);
    this.buyBetterAutoclick = this.buyBetterAutoclick.bind(this);
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

  // Cheapest auto clicker
  buyAutoclick() {
    this.setState({
      autoClickNumber: this.state.autoClickNumber + 1,
      btnClicks: this.state.btnClicks - this.state.autoClickPrice,
      autoClickPrice: this.state.autoClickPrice + 5,
      enabled: true,
      numberOfTimers: this.state.numberOfTimers + 1
    });
  }

  // Hipster auto clicker
  buyBetterAutoclick() {
    this.setState({
      betterAutoClickNumber: this.state.betterAutoClickNumber + 1,
      btnClicks: this.state.btnClicks - this.state.betterAutoClickPrice,
      betterAutoClickPrice: this.state.betterAutoClickPrice + 15,
      betterEnabled: true,
      numberOfBetterTimers: this.state.numberOfBetterTimers + 1
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
    console.log(this.state.wereFifty);
    this.setState({
      wereFifty: true
    });
    if (this.state.wereFifty) {
      toaster.success("Congrats! You're good at clicking virtual buttons!");
    }
  }

  render() {
    let timers = [];
    // Add keys to these arrays
    for (let i = 0; i < this.state.numberOfTimers; i++) {
      timers.push(
        <ReactInterval
          timeout={this.state.timeout}
          enabled={this.state.enabled}
          callback={this.mainClick}
        />
      );
    }
    let betterTimers = [];
    for (let i = 0; i < this.state.numberOfBetterTimers; i++) {
      betterTimers.push(
        <ReactInterval
          timeout={this.state.betterTimeout}
          enabled={this.state.betterEnabled}
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
        {betterTimers}

        <h3>Cheats!!1!</h3>
        <div>
          <Button
            marginBottom={20}
            marginTop={10}
            height={40}
            onClick={this.addTen}
            // disabled={!(this.state.btnClicks >= 10)}
          >
            +10
          </Button>
        </div>
        <div>
          <Button
            marginBottom={20}
            height={40}
            onClick={this.addHundred}
            // disabled={!(this.state.btnClicks >= 100)}
          >
            +100
          </Button>
        </div>

        <h3>Store</h3>
        <div>
          <div>
            <Button
              marginBottom={20}
              marginTop={10}
              onClick={this.buyAutoclick}
              // we enable this button only when this statement is true
              disabled={!(this.state.btnClicks >= this.state.autoClickPrice)}
            >
              auto click +1 (cost: {this.state.autoClickPrice} clicks)
            </Button>
          </div>
          <div>
            <Button
              marginBottom={20}
              marginTop={10}
              onClick={this.buyBetterAutoclick}
              // we enable this button only when this statement is true
              disabled={
                !(this.state.btnClicks >= this.state.betterAutoClickPrice)
              }
            >
              BETTER auto click +10 (cost: {this.state.betterAutoClickPrice}{" "}
              clicks)
            </Button>
          </div>
        </div>

        <h3>Upgrades</h3>
        <div>
          <Button
            marginBottom={20}
            marginTop={10}
            onClick={this.buffMainClick}
            disabled={!(this.state.btnClicks >= this.state.mainClickBuffPrice)}
          >
            Buff MAIN CLICK (cost: {this.state.mainClickBuffPrice} clicks)
          </Button>
        </div>

        {/* <div>
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
        </div> */}
        {/* {this.state.btnClicks >= 50 ? this.toast() : ""} */}
      </div>
    );
  }
}
