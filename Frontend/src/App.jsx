import React, { useContext } from "react";
import Home from "./components/home/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile.jsx";


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
