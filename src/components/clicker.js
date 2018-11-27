import React from "react";
import { Button, Pane } from "evergreen-ui";

import "./clicker.css";

// implement achievements
// implement automatic clickers and their prices
// implement upgrades and their prices

export default class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    this.addOne = this.addOne.bind(this);
    this.addTen = this.addTen.bind(this);
    this.addHundred = this.addHundred.bind(this);
  }

  addOne() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  addTen() {
    this.setState({
      counter: this.state.counter + 10
    });
  }

  addHundred() {
    this.setState({
      counter: this.state.counter + 100
    });
  }
  render() {
    return (
      <div>
        <Button marginBottom={20} height={56} onClick={this.addOne}>
          Click me!
        </Button>
        <div>{this.state.counter}</div>

        <div>
          {this.state.counter >= 10 ? (
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
              disabled="true"
            >
              +10
            </Button>
          )}
        </div>
        <div>
          {this.state.counter >= 100 ? (
            <Button marginBottom={20} height={40} onClick={this.addHundred}>
              +100
            </Button>
          ) : (
            <Button marginBottom={20} height={40} disabled="true">
              +100
            </Button>
          )}
        </div>
      </div>
    );
  }
}
