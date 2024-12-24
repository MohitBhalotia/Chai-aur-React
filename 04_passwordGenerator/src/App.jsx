import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    navigator.clipboard.writeText(password);
  }, [password]);

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "123456789";
    if (characters) str += "!@#$%^&*_-+=[]{}~`";
    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pass);
  }, [length, numbers, characters]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, characters]);
  return (
    <div className="flex min-h-screen items-center">
      <div className=" w-md mx-auto shadow md rounded-lg px-6 py-4 my-4 text-orange-500 bg-gray-800">
        <h1 className="text-4xl text-center my-4 py-4 text-white">
          Password Generator
        </h1>
        <div className="flex shadow-md rounded-lg text-black overflow-hidden mb-2">
          <input
            value={password}
            className="outline-none w-full py-2 px-4 text-lg font-bold"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-2"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center text-lg gap-x-10 py-4">
          <div className="flex flex-col items-center gap-y-1">
            <label htmlFor="length">Length : {length}</label>
            <input
              className="cursor-pointer"
              id="length"
              type="range"
              min={6}
              max={16}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <input
              className="cursor-pointer  w-4 h-4"
              type="checkbox"
              id="numbers"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              className="cursor-pointer w-4 h-4"
              id="characters"
              type="checkbox"
              checked={characters}
              onChange={() => setCharacters(!characters)}
            />
            <label htmlFor="characters">Characters </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
