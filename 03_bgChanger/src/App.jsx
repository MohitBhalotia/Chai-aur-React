import React from "react";
import { useState } from "react";
import Button from "./components/Button";

const App = () => {
  const [color, setColor] = useState("white");
  function handleClick(bgColor) {
    setColor(bgColor);
  }
  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl border-2 border-black">
          <Button color={"Red"} handleClick={handleClick} />
          <Button color={"Green"} handleClick={handleClick} />
          <Button color={"Blue"} handleClick={handleClick} />
          <Button color={"Olive"} handleClick={handleClick} />
          <Button color={"Gray"} handleClick={handleClick} />
          <Button color={"Yellow"} handleClick={handleClick} />
          <Button color={"Pink"} handleClick={handleClick} />
          <Button color={"Purple"} handleClick={handleClick} />
          <Button color={"Lavender"} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default App;
