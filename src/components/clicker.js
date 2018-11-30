import React from "react";
import { Button, Pane, toaster } from "evergreen-ui";
import "./clicker.css";

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
      humanPrice: 500,
      humanTimeout: 1000,
      humanEnabled: false,
      betterHumanMakerCounter: 1,
      // betterhumanmakers cost humans & clicks in that order UNTIL I FIGURE OUT HOW TO ADD KEYS
      betterHumanMakerPrice: [10, 500],
      // 50 achievement bool
      gameOverTrigger: false,
      fiftyTrigger: false
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.gameLoop();
    }, 1000);
  }

  gameLoop = () => {
    if (this.state.enabled) {
      // cheap clicker
      this.triggerAutoclick();
    }
    if (this.state.betterEnabled) {
      // better clicker
      this.triggerBetterAutoclickers();
    }
    // human maker
    if (
      this.state.btnClicks >= 500 &&
      this.state.auto &&
      this.state.humanCounter >= 2
    ) {
      this.createHuman();
    }
    // fifty trigger
    if (this.state.btnClicks >= 50 && !this.state.fiftyTrigger) {
      // move this into its own function
      // toast
      toaster.success("Congrats! You're good at clicking virtual buttons!");
      this.setState({
        fiftyTrigger: true
      });
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // CLICKER
  mainClick = () => {
    this.setState({
      btnClicks: this.state.btnClicks + this.state.mainClickIncrement
    });
  };

  buffMainClick = () => {
    // user this style here too
    // const {count} = this.state;
    this.setState({
      mainClickIncrement: this.state.mainClickIncrement + 1,
      btnClicks: this.state.btnClicks - this.state.mainClickBuffPrice,
      mainClickBuffPrice: this.state.mainClickBuffPrice + 10
    });
  };

  addTen = () => {
    this.setState({
      btnClicks: this.state.btnClicks + 10
    });
  };

  addHundred = () => {
    this.setState({
      btnClicks: this.state.btnClicks + 1000
    });
  };

  // Cheapest auto clicker
  buyAutoclick = () => {
    this.setState({
      autoClickNumber: this.state.autoClickNumber + 1,
      btnClicks: this.state.btnClicks - this.state.autoClickPrice,
      autoClickPrice: Math.floor(
        this.state.autoClickPrice * Math.pow(1.1, this.state.autoClickNumber)
      ),
      enabled: true,
      numberOfTimers: this.state.numberOfTimers + 1
    });
  };

  triggerAutoclick = () => {
    this.setState({
      btnClicks: this.state.btnClicks + 1 * this.state.autoClickNumber
    });
  };

  // Hipster auto clicker
  buyBetterAutoclick = () => {
    this.setState({
      betterAutoClickNumber: this.state.betterAutoClickNumber + 1,
      btnClicks: this.state.btnClicks - this.state.betterAutoClickPrice,
      betterAutoClickPrice: Math.floor(
        this.state.betterAutoClickPrice *
          Math.pow(1.2, this.state.betterAutoClickNumber)
      ),
      betterEnabled: true,
      numberOfBetterTimers: this.state.numberOfBetterTimers + 1
    });
  };
  triggerBetterAutoclickers = () => {
    this.setState({
      btnClicks: this.state.btnClicks + 5 * this.state.betterAutoClickNumber
    });
  };

  // HUMANS
  createHuman = () => {
    const { humanCounter, btnClicks, humanPrice } = this.state;
    this.setState({
      humanCounter: humanCounter + 1,
      btnClicks: btnClicks - humanPrice,
      humanEnabled: true
    });
  };

  betterHumanMaker = () => {
    this.setState({
      betterHumanMakerCounter: this.state.betterHumanMakerCounter + 1,
      btnClicks: this.state.btnClicks - this.state.betterHumanMakerPrice[1],
      humanCounter:
        this.state.humanCounter - this.state.betterHumanMakerPrice[0]
    });
  };
  shortenAutoClickIntervall = () => {
    // Not working
    this.setState({
      interval: Math.round(this.state.interval / 2),
      btnClicks: this.state.btnClicks - 150
    });
  };

  toast = () => {
    if (this.state.wereFifty) {
      toaster.success("Congrats! You're good at clicking virtual buttons!");
    }
  };

  render() {
    // STATES
    const {
      btnClicks,
      humanCounter,
      humanEnabled,
      humanTimeout,
      betterHumanMakerCounter,
      humanPrice
    } = this.state;
    // no more making instances of timers, we use a gameloop now boys

    return (
      <div>
        {/* add this to the gameloop */}
        <Pane
          display="flex"
          background="tint2"
          padding={20}
          justifyContent="space-between"
        >
          <Button height={40} onClick={this.mainClick}>
            Click me!
          </Button>
          <h4>Clicks: {Math.round(btnClicks)}</h4>

          <Button
            height={40}
            onClick={this.createHuman}
            disabled={!(btnClicks >= 5000)}
            // display="none"
            style={{ opacity: !(btnClicks >= 5000) ? 0.5 : 1 }}
          >
            Create Human 😐 cost: {humanPrice} Clicks
          </Button>
          <h4>{humanCounter > 0 && <div>Humans: {humanCounter}</div>}</h4>
          <h4>
            {humanCounter > 0 && (
              <div>Humans/second: {humanCounter * betterHumanMakerCounter}</div>
            )}
          </h4>
        </Pane>

        <h3>Cheats!!1!</h3>
        <Pane display="flex" background="tint2" padding={20}>
          <Button
            height={20}
            onClick={this.addTen}
            // disabled={!(this.state.btnClicks >= 10)}
          >
            +10
          </Button>
          <Button
            height={20}
            onClick={this.addHundred}
            // disabled={!(this.state.btnClicks >= 100)}
          >
            +1000
          </Button>
        </Pane>

        <h3>Store</h3>
        <Pane
          display="flex"
          background="tint2"
          padding={20}
          justifyContent="space-between"
        >
          <Button
            onClick={this.buyAutoclick}
            // we enable this button only when this statement is true
            disabled={!(btnClicks >= this.state.autoClickPrice)}
          >
            auto click {this.state.autoClickNumber} (cost:{" "}
            {Math.round(this.state.autoClickPrice)} clicks)
          </Button>
          <h4>{this.state.autoClickNumber} /second</h4>
          <Button
            onClick={this.buyBetterAutoclick}
            // we enable this button only when this statement is true
            disabled={!(btnClicks >= this.state.betterAutoClickPrice)}
          >
            BETTER auto click {this.state.betterAutoClickNumber}(cost:
            {Math.round(this.state.betterAutoClickPrice)} clicks)
          </Button>
          <h4>{this.state.betterAutoClickNumber * 5} /second</h4>
        </Pane>

        <h3>Upgrades</h3>
        <Pane
          display="flex"
          background="tint2"
          padding={20}
          justifyContent="space-between"
        >
          <Button
            onClick={this.buffMainClick}
            disabled={!(btnClicks >= this.state.mainClickBuffPrice)}
          >
            Buff MAIN CLICK (cost: {this.state.mainClickBuffPrice} clicks)
          </Button>
          {/* add betterhumanmaker improver button */}
          <Button
            onClick={this.betterHumanMaker}
            disabled={
              !(
                btnClicks >= this.state.betterHumanMakerPrice[1] &&
                humanCounter >= this.state.betterHumanMakerPrice[0]
              )
            }
          >
            Better Human Maker 🇸🇦 (cost: {this.state.betterHumanMakerPrice[0]}{" "}
            Humans & {this.state.betterHumanMakerPrice[1]} Clicks)
          </Button>
        </Pane>

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
