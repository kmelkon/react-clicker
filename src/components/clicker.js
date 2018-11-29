import React from "react";
import { Button, Pane, toaster } from "evergreen-ui";
import ReactInterval from "react-interval";

import "./clicker.css";

// add a number of bla/second

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
      interval: 1000,
      // cheap react interval values
      timer: null,
      enabled: false,
      timeout: 1000,
      numberOfTimers: 0,
      // better react interval values
      betterTimer: null,
      betterEnabled: false,
      betterTimeout: 1000,
      numberOfBetterTimers: 0,
      // HUMANS
      humanCounter: 0,
      humanTimeout: 1000,
      humanEnabled: false,
      // 50 achievement bool
      gameOverTrigger: false,
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
    this.createHuman = this.createHuman.bind(this);
    this.triggerAutoclick = this.triggerAutoclick.bind(this);
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

  // CLICKER
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
      btnClicks: this.state.btnClicks + 1000
    });
  }

  // Cheapest auto clicker
  buyAutoclick() {
    this.setState({
      autoClickNumber: this.state.autoClickNumber + 1,
      btnClicks: this.state.btnClicks - this.state.autoClickPrice,
      autoClickPrice: Math.round(this.state.autoClickPrice * 1.15),
      enabled: true,
      numberOfTimers: this.state.numberOfTimers + 1
    });
  }

  // fix this equation so it makes sense and go to sleep
  triggerAutoclick() {
    this.setState({
      btnClicks: (this.state.btnClicks + 1) * this.state.autoClickNumber
    });
  }

  // Hipster auto clicker
  buyBetterAutoclick() {
    this.setState({
      betterAutoClickNumber: this.state.betterAutoClickNumber + 1,
      btnClicks: this.state.btnClicks - this.state.betterAutoClickPrice,
      betterAutoClickPrice: Math.round(this.state.betterAutoClickPrice * 1.3),
      betterEnabled: true,
      numberOfBetterTimers: this.state.numberOfBetterTimers + 1
    });
  }

  // HUMANS
  createHuman() {
    const { humanCounter, btnClicks } = this.state;
    this.setState({
      humanCounter: humanCounter + 1,
      btnClicks: btnClicks - 500,
      humanEnabled: btnClicks >= 500 ? true : false
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
    // STATES
    const { btnClicks, humanCounter, humanEnabled, humanTimeout } = this.state;
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
    // let humans = [];
    // for (let i = 0; i < humanCounter; i++) {
    //   humans.push(
    //     <ReactInterval
    //       key={i}
    //       timeout={humanTimeout}
    //       enabled={humanEnabled}
    //       callback={this.createHuman}
    //     />
    //   );
    // }

    return (
      <div>
        {/* we need a way to make autoclickers number dynamic */}
        {/* {timers} */}
        {betterTimers}
        {/* {humans} */}
        <ReactInterval
          timeout={this.state.timeout}
          enabled={this.state.enabled}
          callback={this.triggerAutoclick}
        />
        <ReactInterval
          timeout={humanTimeout}
          enabled={humanEnabled}
          callback={this.createHuman}
        />
        <Pane display="flex" background="tint2" padding={20}>
          <Button margin={10} height={40} onClick={this.mainClick}>
            Click me!
          </Button>
          <h2>Clicks: {Math.round(btnClicks)}</h2>

          <Button
            margin={10}
            height={40}
            onClick={this.createHuman}
            disabled={!(btnClicks >= 5000)}
            // display="none"
          >
            Create Human 😐
          </Button>
          <h2>{humanCounter > 0 && <div>Humans: {humanCounter}</div>}</h2>
        </Pane>

        <h3>Cheats!!1!</h3>
        <div>
          <Button
            marginBottom={20}
            marginTop={10}
            height={20}
            onClick={this.addTen}
            // disabled={!(this.state.btnClicks >= 10)}
          >
            +10
          </Button>
        </div>
        <div>
          <Button
            marginBottom={20}
            height={20}
            onClick={this.addHundred}
            // disabled={!(this.state.btnClicks >= 100)}
          >
            +1000
          </Button>
        </div>

        <h3>Store</h3>
        <div>
          <div>
            <Button
              marginBottom={10}
              marginTop={10}
              onClick={this.buyAutoclick}
              // we enable this button only when this statement is true
              disabled={!(btnClicks >= this.state.autoClickPrice)}
            >
              auto click +1 (cost: {Math.round(this.state.autoClickPrice)}{" "}
              clicks)
            </Button>
          </div>
          <div>
            <Button
              marginBottom={10}
              marginTop={10}
              onClick={this.buyBetterAutoclick}
              // we enable this button only when this statement is true
              disabled={!(btnClicks >= this.state.betterAutoClickPrice)}
            >
              BETTER auto click +10 (cost:{" "}
              {Math.round(this.state.betterAutoClickPrice)} clicks)
            </Button>
          </div>
        </div>

        <h3>Upgrades</h3>
        <div>
          <Button
            marginBottom={10}
            marginTop={10}
            onClick={this.buffMainClick}
            disabled={!(btnClicks >= this.state.mainClickBuffPrice)}
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
