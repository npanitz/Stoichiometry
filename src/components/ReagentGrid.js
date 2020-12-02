import React from "react";

const ReagentGrid = (props) => {
  return (
    <div>
      <div className="split left">
        <div className="top reagent-grid">
          {props.solidReagents.map((solidReagent) => solidReagent[1])}
        </div>
        <div className="bottom reagent-grid">
          {props.liquidReagents.map((liquidReagent) => liquidReagent[1])}
        </div>
      </div>
      <div className="split right">
        <div className="top reagent-grid">
          {props.solidResults.map((solidReagent) => solidReagent[1])}
        </div>
        <div className="bottom reagent-grid">
          {props.liquidResults.map((liquidReagent) => liquidReagent[1])}
        </div>
      </div>
    </div>
  );
};

export default ReagentGrid;
