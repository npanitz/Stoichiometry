import React from "react";
import "./App.css";
import NewReagent from "./components/NewReagent";
import Button from "./components/Button";
// import NewResult from "./components/NewResult";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solidCount: 0,
      liquidCount: 0,
      solidReagents: [],
      liquidReagents: [],
      solidResults: [],
      liquidResults: [],
    };

    this.clear = this.clear.bind(this);
    this.newReagent = this.newReagent.bind(this);
    this.results = this.results.bind(this);
  }

  results() {
    console.log("results");
  }

  newReagent(phase) {
    const newPhase = phase === "solid" ? "solid" : "liquid";
    this.setState({
      [`${phase}Count`]: this.state[`${phase}Count`] + 1,
      [`${phase}Reagents`]: [
        ...this.state[`${phase}Reagents`],
        [
          phase + (this.state[`${phase}Count`] + 1),
          <NewReagent phase={newPhase} count={this.state[`${phase}Count`]} />,
        ],
      ],
    });
  }

  clear() {
    console.log("Clear");
    this.setState({
      solidCount: 0,
      liquidCount: 0,
      solidReagents: [],
      liquidReagents: [],
      solidResults: [],
      liquidResults: [],
    });
  }

  render() {
    return (
      <div>
        <Button click={this.clear} text="Clear" />
        <Button click={() => this.newReagent("solid")} text="New Solid" />
        <Button click={() => this.newReagent("liquid")} text="New Liquid" />
        <Button click={this.results} text="Results" />

        <div className="split left">
          <div className="top reagent-grid">
            {this.state.solidReagents.map((solidReagent) => solidReagent[1])}
          </div>
          <div className="bottom reagent-grid">
            {this.state.liquidReagents.map((liquidReagent) => liquidReagent[1])}
          </div>
        </div>
        <div className="split right">
          <div className="top reagent-grid">
            {this.state.solidResults.map((solidReagent) => solidReagent[1])}
          </div>
          <div className="bottom reagent-grid">
            {this.state.liquidResults.map((liquidReagent) => liquidReagent[1])}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
