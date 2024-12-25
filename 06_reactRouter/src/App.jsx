import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/AboutUs/About";
import Contact from "./pages/Contact/Contact";
const App = () => {
  return (
    <div>
      {/* <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer /> */}

      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
