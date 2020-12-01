import React from "react";
import NewEntry from "./NewEntry";

const NewReagent = (props) => {
  return (
    <div key={`${props.phase} ${props.count} container`} className="reagent">
      <label>{`${props.phase} Reagent ${props.count + 1}`}</label>
      <NewEntry
        key={`Solid ${props.count} name`}
        labelName="Name"
        handleChange={props.handleChange}
        updateLabel={props.updateCurrentLabel}
      />
      <NewEntry
        key={`Solid ${props.count} weight`}
        labelName="Weight (g)"
        handleChange={props.handleChange}
        updateLabel={props.updateCurrentLabel}
      />
      <NewEntry
        key={`Solid ${props.count} mw`}
        labelName="MW (g/mol)"
        handleChange={props.handleChange}
        updateLabel={props.updateCurrentLabel}
      />
      <div onClick={props.onFormSubmit} className="submit button">
        Submit
      </div>
    </div>
  );
};

export default NewReagent;
