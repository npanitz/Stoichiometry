import React from "react";
import NewEntry from "./NewEntry";

class NewReagent extends React.Component {
  isSolid(labelName) {
    if (this.props.phase === "solid") {
      return (
        <NewEntry
          key={`${labelName} ${this.props.count} mw`}
          count={this.props.count + 1}
          phase={labelName}
          labelName={labelName === "Solid" ? "MW (g/mol)" : "Density(mg/mL)"}
        />
      );
    } else {
      return;
    }
  }
  render() {
    const labelName = this.props.phase === "solid" ? "Solid" : "Liquid";
    return (
      <div className="reagent">
        <label className="title">{`${labelName} Reagent ${
          this.props.count + 1
        }`}</label>
        <NewEntry
          key={`${labelName} ${this.props.count} name`}
          count={this.props.count + 1}
          phase={labelName}
          labelName="Name"
          handleChange={this.props.handleChange}
          updateLabel={this.props.updateCurrentLabel}
        />
        <NewEntry
          key={`${labelName} ${this.props.count} weight`}
          count={this.props.count + 1}
          phase={labelName}
          labelName={labelName === "Solid" ? "Weight (g)" : "Volume (mL)"}
          handleChange={this.props.handleChange}
          updateLabel={this.props.updateCurrentLabel}
        />
        {this.isSolid(labelName)}
        <div onClick={this.props.onFormSubmit} className="submit button">
          Submit
        </div>
      </div>
    );
  }
}

export default NewReagent;
