import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/slices/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-full container mx-auto px-4 py-8 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
