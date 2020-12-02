import React from "react";
import "../App.css";

const Button = ({ click, text }) => {
  const classMod = text === "Results" ? "results" : "";
  return (
    <div onClick={click} className={`${classMod} button`}>
      {text}
    </div>
  );
};

export default Button;
