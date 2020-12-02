import React from "react";
import "./App.css";
import NewReagent from "./components/NewReagent";
import Button from "./components/Button";
import ReagentGrid from "./components/ReagentGrid";
import NewResult from "./components/NewResult";

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
      solidMultipliers: [],
      liquidMultipliers: [],
      templateMoles: null,
      moleKeys: [],
      startingMoles: null,
    };

    this.clear = this.clear.bind(this);
    this.newReagent = this.newReagent.bind(this);
    this.results = this.results.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.templateSubmit = this.templateSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      solidResults: [
        ...this.state.solidResults,
        [
          "template solid 1",
          <NewReagent
            key={`template solid container`}
            phase="solid"
            count={0}
            onFormSubmit={this.templateSubmit}
          />,
        ],
      ],
    });
  }
  results() {
    const templateRatio = this.state.templateMoles / this.state.startingMoles;
    const newSolidMoles = this.state.solidMultipliers.map((multiplier) => {
      return multiplier * templateRatio;
    });
    const newLiquidMoles = this.state.liquidMultipliers.map((multiplier) => {
      return multiplier * templateRatio;
    });
    console.log("new Solid Moles: ", newSolidMoles);
    console.log("new Liquid Moles: ", newLiquidMoles);
  }

  newResult(phase) {
    const newPhase = phase === "solid" ? "Solid " : "Liquid ";
    const newCount = this.state[`${phase}Count`] + 1;
    const newTitle = newPhase + "Reagent " + newCount;
    this.setState({
      moleKeys: [...this.state.moleKeys, newTitle],
      [`${phase}Count`]: this.state[`${phase}Count`] + 1,
      [`${phase}Reagents`]: [
        ...this.state[`${phase}Reagents`],
        [
          phase + (this.state[`${phase}Count`] + 1),
          <NewReagent
            key={`${phase}${this.state[`${phase}Count`] + 1} container`}
            phase={phase}
            count={this.state[`${phase}Count`]}
            onFormSubmit={this.onFormSubmit}
          />,
        ],
      ],
    });
  }

  newReagent(phase) {
    const newPhase = phase === "solid" ? "Solid " : "Liquid ";
    const newCount = this.state[`${phase}Count`] + 1;
    const newTitle = newPhase + "Reagent " + newCount;
    this.setState({
      moleKeys: [...this.state.moleKeys, newTitle],
      [`${phase}Count`]: this.state[`${phase}Count`] + 1,
      [`${phase}Reagents`]: [
        ...this.state[`${phase}Reagents`],
        [
          phase + (this.state[`${phase}Count`] + 1),
          <NewReagent
            key={`${phase}${this.state[`${phase}Count`] + 1} container`}
            phase={phase}
            count={this.state[`${phase}Count`]}
            onFormSubmit={this.onFormSubmit}
          />,
        ],
      ],
    });
  }

  templateSubmit(ev) {
    const val1 = parseFloat(
      ev.target.childNodes[0].parentNode.parentElement.childNodes[2]
        .childNodes[0][0].form[0].value
    );
    console.log(val1);
    const val2 = parseFloat(
      ev.target.childNodes[0].parentNode.parentElement.childNodes[3]
        .childNodes[0][0].form[0].value
    );
    console.log(val2);
    this.setState({
      templateMoles: val1 / val2,
    });
  }
  onFormSubmit(ev) {
    const label = ev.target.parentElement.firstChild.childNodes[0].data;
    const phase = label.split(" ")[0] === "Solid" ? "solid" : "liquid";
    const index = parseInt(label.slice(-1)) - 1;
    console.log(label, index, ev);
    const name =
      ev.target.childNodes[0].parentNode.parentElement.childNodes[1]
        .childNodes[0][0].form[0].value;
    const val1 = parseFloat(
      ev.target.childNodes[0].parentNode.parentElement.childNodes[2]
        .childNodes[0][0].form[0].value
    );
    const val2 =
      phase === "solid"
        ? parseFloat(
            ev.target.childNodes[0].parentNode.parentElement.childNodes[3]
              .childNodes[0][0].form[0].value
          )
        : 1;
    if (label === "Solid Reagent 1") {
      if (this.state.solidMultipliers[0] !== 1) {
        this.setState({
          solidMultipliers: [...this.state.solidMultipliers, 1],
          startingMoles: val1 / val2,
        });
      }
    } else {
      const updateMultipliers = this.state[`${phase}Multipliers`];
      updateMultipliers[index] = val1 / val2 / this.state.startingMoles;
      this.setState({ [`${phase}Multipliers`]: updateMultipliers });
    }
    ev.preventDefault();
  }
  clear() {
    console.log("Clear");
    this.setState({
      solidCount: 0,
      liquidCount: 0,
      solidReagents: [],
      liquidReagents: [],
      solidResults: [this.state.solidResults[0]],
      liquidResults: [],
      startingMoles: null,
      multipliers: [],
    });
  }

  render() {
    return (
      <div>
        <Button click={this.clear} text="Clear" />
        <Button click={() => this.newReagent("solid")} text="New Solid" />
        <Button click={() => this.newReagent("liquid")} text="New Liquid" />
        <Button click={this.results} text="Results" />

        <ReagentGrid
          solidReagents={this.state.solidReagents}
          liquidReagents={this.state.liquidReagents}
          solidResults={this.state.solidResults}
          liquidResults={this.state.liquidResults}
        />
      </div>
    );
  }
}

export default App;
