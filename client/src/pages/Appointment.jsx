import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useActionData } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingAnimation from "../components/UI/LoadingAnimation";
import AppointmentCard from "../components/Appointment/AppointmentCard";
import UpdateAppointment from "../components/Appointment/UpdateAppointment";
import AppointmentView from "../components/Appointment/AppointmentView";

const Appointment = () => {
  return (
    <div className="w-full flex flex-col h-screen bg-[#ebebeb]">
      <Navbar />
      <AppointmentView />
    </div>
  );
};

export default Appointment;
