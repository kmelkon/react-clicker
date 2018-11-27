import React from "react";
import ReactDOM from "react-dom";
import Clicker from "./components/clicker";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>The Clicker Game</h1>
      <Clicker />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
