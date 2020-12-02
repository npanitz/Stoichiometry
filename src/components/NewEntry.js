const NewEntry = (props) => {
  return (
    <div className="reagent-entry">
      <form
        onChange={props.handleChange}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="reagent-label">{props.labelName}: </label>
        <input
          onClick={() => console.log(props.phase, props.count, props.labelName)}
          type="text"
          className="reagent-input"
        ></input>
      </form>
    </div>
  );
};

export default NewEntry;
