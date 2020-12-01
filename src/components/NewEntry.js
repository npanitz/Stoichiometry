const NewEntry = (props) => {
  return (
    <div key={`${props.key}${props.labelName}`} className="reagent-entry">
      <form
        onChange={props.handleChange}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="reagent-label">{props.labelName}: </label>
        <input
          onClick={() => console.log(props.labelName, props.key)}
          type="text"
          className="reagent-input"
        ></input>
      </form>
    </div>
  );
};

export default NewEntry;
