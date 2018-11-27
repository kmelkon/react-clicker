import React from "react";
import { Button, Pane } from "evergreen-ui";

import "./clicker.css";

// implement achievements
// implement automatic clickers' prices
// implement upgrades and their prices
// move automatic clicker into its own component

export default class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnClicks: 0,
      auto: null
    };
    this.addOne = this.addOne.bind(this);
    this.addTen = this.addTen.bind(this);
    this.addHundred = this.addHundred.bind(this);
  }

  addOne() {
    this.setState({
      btnClicks: this.state.btnClicks + 1
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

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.auto) {
        this.setState({ btnClicks: this.state.btnClicks + 1 });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <Button marginBottom={20} height={56} onClick={this.addOne}>
          Click me!
        </Button>
        <div>{this.state.btnClicks}</div>

        <div>
          {this.state.btnClicks >= 10 ? (
            <Button
              marginBottom={20}
              marginTop={10}
              height={40}
              onClick={this.addTen}>
              +10
            </Button>
          ) : (
            <Button
              marginBottom={20}
              marginTop={10}
              height={40}
              disabled="true">
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
            <Button marginBottom={20} height={40} disabled="true">
              +100
            </Button>
          )}
        </div>

        {this.state.btnClicks >= 50 ? (
          <Button onClick={() => this.setState({ auto: "one" })}>
            auto click +1
          </Button>
        ) : (
          <Button
            disabled="true"
            onClick={() => this.setState({ auto: "one" })}>
            auto click +1
          </Button>
        )}
      </div>
    );
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.props.auto) {
        this.setState({ number: this.state.number + 1 });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h1>{this.state.number}</h1>
      </div>
    );
  }
}
