import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useActionData } from "react-router-dom";
import Navbar from "../components/Navbar";
import VaccinationMain from "../components/Vaccination/VaccinationMain";

const Appointment = () => {
  return (
    <div className="w-full flex flex-col h-screen bg-[#ebebeb]">
      <Navbar />
      <VaccinationMain />
    </div>
  );
};

export default Appointment;
