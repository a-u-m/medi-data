import React, { useState, useEffect } from "react";
import { Routes, Route, redirect, Navigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vaccination from "./pages/Vaccination";
import Appointment from "./pages/Appointment";
import Prescription from "./pages/Prescription";
import Test from "./pages/Test";
import Disease from "./pages/Disease";
import PhysicalTraits from "./pages/PhysicalTraits";
import Navbar from "./components/Navbar";
import "./index.css";
import { LoginProvider } from "./components/contexts/LoginContext";
import LoginContext from "./components/contexts/LoginContext";

const App = () => {
  const ctx = useContext(LoginContext);

  return (
    <LoginProvider>
      <Routes>
        <Route path="/" exact element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vaccination" element={<Vaccination />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/prescription" element={<Prescription/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/disease" element={<Disease/>} />
        <Route path="/physicals" element={<PhysicalTraits />} />
      </Routes>
    </LoginProvider>
  );
};

export default App;
