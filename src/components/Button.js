import React from "react";
import "../App.css";

const Button = ({ click, text }) => {
  return (
    <div onClick={click} className={`${text} button`}>
      {text}
    </div>
  );
};

export default Button;
