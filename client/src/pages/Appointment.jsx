import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingAnimation from "../components/UI/LoadingAnimation";
import AppointmentCard from "../components/Appointment/AppointmentCard";
import UpdateAppointment from "../components/Appointment/UpdateAppointment";
import AppointmentView from "../components/Appointment/AppointmentView";

const Appointment = () => {
  const [appointmentData, setAppointmnetData] = useState({ isFetched: false });
  const [loginDetails, setLoginDetails] = useState({ isAuthenticated: true });
  const [appointmentUpdateView, setAppointmentUpdateView] = useState(false);
  const updateAppointmendDataHandler = () => {
    setAppointmentUpdateView((prevState) => {
      return !prevState;
    });
  };
  useEffect(() => {
    const ls = localStorage.getItem("loginState");
    if (ls === null) {
      setLoginDetails({ isAuthenticated: false });
    } else {
      setLoginDetails(JSON.parse(ls));
    }
  }, []);
  useEffect(() => {
    console.log(loginDetails);
    const fetchAppointmentData = () => {
      if (!loginDetails.isAuthenticated) return;
      const res = axios.get(
        `http://localhost:3300/${loginDetails.id}/appointmentDetails`
      );
      console.log(res.data);
      setAppointmnetData({ data: res.data, isFetched: true });
    };
    fetchAppointmentData();
  }, []);
  return (
    <>
      {!loginDetails.isAuthenticated ? (
        <Navigate replace to="/login" />
      ) : (
        <>
          {appointmentData.isFetched ? (
            <div className="w-full flex flex-col h-screen bg-[#ebebeb]">
              <Navbar />
              {appointmentUpdateView && (
                <UpdateAppointment
                  updateAppointmendDataHandler={updateAppointmendDataHandler}
                />
              )}
              {!appointmentUpdateView && (
                <AppointmentView
                  updateAppointmendDataHandler={updateAppointmendDataHandler}
                  appointmentData={appointmentData}
                />
              )}
            </div>
          ) : (
            <LoadingAnimation />
          )}
        </>
      )}
    </>
  );
};

export default Appointment;
