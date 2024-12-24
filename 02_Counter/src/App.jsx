import React from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [counter, setCounter] = useState(0);
  // This is a frequently asked inteview question
  const addValue = () => {
    //counter = counter + 1
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
  };
  return (
    <div>
      <div>
        <h1>Chai aur React</h1>
        <h2>Counter Value : {counter}</h2>
      </div>
      <button disabled={counter <= 0} onClick={() => setCounter(counter - 1)}>
        Decrease Value
      </button>
      <button disabled={counter >= 20} onClick={() => setCounter(counter + 1)}>
        Increase Value
      </button>
    </div>
  );
};

export default App;
