import React from "react";
import UserContextProvider from "./context/UserContextProvider";
import Profile from "./components/Profile";
import Login from "./components/Login";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <h1>Chai aur React</h1>
        <Login/>
        <Profile/>
      </UserContextProvider>
    </div>
  );
};

export default App;
