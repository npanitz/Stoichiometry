import React from "react";

const NewResult = (key, labelName, inputText) => {
  return (
    <div key={key} className="reagent-entry">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <label className="reagent-label">{labelName}: </label>
        <input
          type="text"
          value={inputText}
          readOnly={true}
          className="reagent-input"
        ></input>
      </form>
    </div>
  );
};

export default NewResult;
