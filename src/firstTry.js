import React from "react";
import "./App.css";
import NewReagent from "./components/NewReagent";
import NewResult from "./components/NewResult";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solidReagents: [],
      liquidReagents: [],
      solidResultsInit: [],
      solidResults: [],
      liquidResultsInit: [],
      liquidResults: [],
      term: "",
      currentLabel: "",
      liquidCount: 0,
      solidCount: 0,
      keys: [],
      weight: null,
      mw: null,
      volume: null,
      density: null,
      currentPhase: null,
      currentCount: null,
      isSubmitDisabled: false,
      isNewDisabled: false,
      isResultsDisabled: true,
      solidMultipliers: [],
      liquidMultipliers: [],
    };
    this.createSolidReagent = this.createSolidReagent.bind(this);
    this.createLiquidReagent = this.createLiquidReagent.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.updateSolids = this.updateSolids.bind(this);
    this.updateLiquids = this.updateLiquids.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.initOnFormSubmit = this.initOnFormSubmit.bind(this);
    this.updateCurrentLabel = this.updateCurrentLabel.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  updateSolids() {
    console.log(this.state.weight, this.state.mw, this.state.solidCount);
    var newSolidMultipliers = [];
    let startingMoles = 1;
    if (this.state.solidCount === 2) {
      startingMoles = parseFloat(this.state.weight) / parseFloat(this.state.mw);
    }

    newSolidMultipliers =
      parseFloat(this.state.weight) / parseFloat(this.state.mw) / startingMoles;

    this.setState({
      solidMultipliers: this.state.solidMultipliers.concat([
        this.state.name,
        newSolidMultipliers,
      ]),
    });
    console.log(this.state.solidMultipliers);
  }

  updateLiquids() {
    const newReagent = (
      <div key={`Liquid ${this.state.liquidCount}`} className="reagent">
        <label>{`Liquid Reagent ${this.state.liquidCount}`}</label>
        {NewReagent("Name", this.state.name)}
        {NewReagent("Volume (mL)", this.state.volume)}
        {NewReagent("Density (mg/mL)", this.state.density)}
      </div>
    );
    this.setState({
      liquidResultsInit: [...this.state.liquidResultsInit, newReagent],
    });
  }

  getResults() {
    const newSolidReagent = (
      <div key={`Solid ${this.state.solidCount}`} className="reagent">
        <label>{`Solid Reagent ${this.state.solidCount - 1}`}</label>
        {NewResult("Name", this.state.name)}
        {NewResult("Weight (g)", this.state.weight)}
        {NewResult("MW (g/mol)", this.state.mw)}
      </div>
    );

    this.setState({
      solidResultsInit: [...this.state.solidResultsInit, newSolidReagent],
    });

    this.setState({ isResultsDisabled: true });
    console.log("Solids: ", this.state.solidResultsInit);
    console.log("Liquids: ", this.state.liquidResults);
    console.log(this.state.multipliers);

    if (!this.state.isResultsDisabled && this.state.solidReagents.length > 0) {
      const startingSolidName = this.state.solidResultsInit[0].props.children[1]
        .props.children.props.children[1].props.value;
      const startingSolidWeight = this.state.solidResultsInit[0].props
        .children[2].props.children.props.children[1].props.value;
      const startingSolidMW = this.state.solidResultsInit[0].props.children[3]
        .props.children.props.children[1].props.value;

      const startingMoles =
        parseFloat(startingSolidWeight) / parseFloat(startingSolidMW);

      const newMultipliers = [];
    }
  }
  updateCurrentLabel(labelName, key) {
    console.log(key);
    this.setState({ term: "" });
    switch (labelName) {
      case "Name":
        this.setState({ labelName: "name" });
        break;
      case "Weight (g)":
        this.setState({ labelName: "weight" });
        break;
      case "MW (g/mol)":
        this.setState({ labelName: "mw" });
        break;
      case "Volume (mL)":
        this.setState({ labelName: "volume" });
        break;
      case "Density (mg/mL)":
        this.setState({ labelName: "density" });
        break;
      default:
        break;
    }
    console.log(
      labelName,
      this.state.currentPhase,
      this.state[this.state.currentCount]
    );
  }

  handleChange(ev) {
    console.log(ev.target.value);
    this.setState({
      [`${this.state.labelName}`]: ev.target.value,
    });
  }

  initOnFormSubmit(ev) {
    console.log(this.state.name, this.state.weight, this.state.mw);
  }
  onFormSubmit(ev) {
    if (this.state.isSubmitDisabled === false) {
      console.log("submitting form");
      console.log(this.state.currentPhase);
      ev.preventDefault();
      if (this.state.currentPhase === `Solid`) {
        this.updateSolids();
      } else if (this.state.currentPhase === `Liquid`) {
        this.updateLiquids();
      }
      this.setState({
        isSubmitDisabled: true,
        isNewDisabled: false,
        isResultsDisabled: false,
      });
    } else {
      alert("You already submitted this entry.");
    }
  }

  clearScreen() {
    this.setState({
      solidReagents: [],
      liquidReagents: [],
      liquidCount: 0,
      solidCount: 0,
      solidResults: [],
      liquidResults: [],
      isSubmitDisabled: false,
      isNewDisabled: false,
      isResultsDisabled: true,
      solidResultsInit: [],
      liquidResultsInit: [],
      solidMultipliers: [],
    });
  }

  createSolidReagent() {
    if (!this.state.isNewDisabled) {
      this.setState({
        currentPhase: "Solid",
        currentCount: "solidCount",
      });
      this.setState({ solidCount: this.state.solidCount + 1 });
      const newReagent = (
        <div
          key={`Solid ${this.state.solidCount} container`}
          className="reagent"
        >
          <label>{`Solid Reagent ${this.state.solidCount + 1}`}</label>
          {NewReagent(
            `Solid ${this.state.solidCount} name`,
            "Name",
            this.handleChange,
            this.updateCurrentLabel
          )}
          {NewReagent(
            `Solid ${this.state.solidCount} weight`,
            "Weight (g)",
            this.handleChange,
            this.updateCurrentLabel
          )}
          {NewReagent(
            `Solid ${this.state.solidCount} mw`,
            "MW (g/mol)",
            this.handleChange,
            this.updateCurrentLabel
          )}
          <div onClick={this.onFormSubmit} className="submit button">
            Submit
          </div>
        </div>
      );
      this.setState({
        solidReagents: [...this.state.solidReagents, newReagent],
        isSubmitDisabled: false,
        isNewDisabled: true,
      });
    } else {
      alert("Please submit one reagent at a time!");
    }
  }

  createLiquidReagent() {
    if (!this.state.isNewDisabled) {
      this.setState({
        liquidResultsInit: this.state.liquidResults.concat(
          `Liquid ${this.state.liquidCount}`
        ),
        currentPhase: "Liquid",
        currentCount: "liquidCount",
      });
      this.setState({ liquidCount: this.state.liquidCount + 1 });
      const newLiquid = (
        <div
          key={`Liquid ${this.state.liquidCount} Container`}
          className="reagent"
        >
          <label>{`Liquid Reagent ${this.state.liquidCount}`}</label>
          {NewReagent(
            `Liquid ${this.state.liquidCount} name`,
            "Name",
            this.handleChange,
            this.updateCurrentLabel
          )}
          {NewReagent(
            `Liquid ${this.state.liquidCount} volume`,
            "Volume (mL)",
            this.handleChange,
            this.updateCurrentLabel
          )}
          {NewReagent(
            `Liquid ${this.state.liquidCount} density`,
            "Density (mg/mL)",
            this.handleChange,
            this.updateCurrentLabel
          )}
          <div onClick={this.onFormSubmit} className="submit button">
            Submit
          </div>
        </div>
      );
      this.setState({
        liquidReagents: [...this.state.liquidReagents, newLiquid],
        isSubmitDisabled: false,
        isNewDisabled: true,
      });
    } else {
      alert("Please Submit one reagent at a time!");
    }
  }

  render() {
    return (
      <div>
        <div className="button" onClick={this.clearScreen}>
          Clear
        </div>
        <div className="button" onClick={this.createSolidReagent}>
          New Solid
        </div>
        <div className="button" onClick={this.createLiquidReagent}>
          New Liquid
        </div>
        <div className="results button" onClick={this.getResults}>
          Results
        </div>
        <div className="split left">
          <div className="top reagent-grid">
            {this.state.solidReagents.map((solidReagent) => solidReagent)}
          </div>
          <div className="bottom reagent-grid">
            {this.state.liquidReagents.map((liquidReagent) => liquidReagent)}
          </div>
        </div>
        <div className="split right">
          <div className="top reagent-grid">
            <div key={`conrete value`} className="reagent">
              <label>{`Solid Reagent 1`}</label>
              {["Name", "Weight (g)", "MW (g/mol)"].map((label) => {
                return NewReagent(
                  `conrete value`,
                  label,
                  this.handleChange,
                  this.updateCurrentLabel
                );
              })}
              <div onClick={this.initOnFormSubmit} className="submit button">
                Submit
              </div>
            </div>
            {this.state.solidResults.map((solidReagent) => solidReagent)}
          </div>
          <div className="bottom reagent-grid">
            {this.state.liquidResults.map((liquidReagent) => liquidReagent)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
