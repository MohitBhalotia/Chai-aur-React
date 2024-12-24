import React from "react";

const Button = ({ color, handleClick }) => {
  return (
    <div
      className="outline-none px-4 py-1 rounded-full shadow-lg cursor-pointer"
      style={{ backgroundColor: color }}
      onClick={() => handleClick(color)}
    >
      {color}
    </div>
  );
};

export default Button;
