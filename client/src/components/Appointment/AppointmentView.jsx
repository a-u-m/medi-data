import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import UpdateAppointment from "./UpdateAppointment";
import LoadingAnimation from "../UI/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import overviewIcon from "../../assets/research.png";
import ErrorModal from "../UI/ErrorModal";

const AppointmentView = (props) => {
  const navigate = useNavigate();
  const [modalDetails, setModalDetails] = useState({
    isVisible: false,
    title: "",
    type: "",
  });
  const [appointmentData, setAppointmnetData] = useState({ isFetched: false });
  const [loginDetails, setLoginDetails] = useState({});
  const [state, setState] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [appointmentUpdateView, setAppointmentUpdateView] = useState(false);
  const closeModal = () => {
    setModalDetails({ isVisible: false, title: "", type: "" });
  };
  const updateAppointmendDataHandler = () => {
    setAppointmentUpdateView((prevState) => {
      return !prevState;
    });
  };
  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3300/appointment/${id}`);
      setState((prevState) => {
        return !prevState;
      });
    } catch {
      setModalDetails({
        isVisible: true,
        title: "Server Error! Please try again later",
        type: "error",
      });
    }
  };
  useEffect(() => {
    const ls = localStorage.getItem("loginState");
    if (ls === null) {
      setLoginDetails({ isAuthenticated: false });
      setIsAuthenticated(false);
    } else {
      setLoginDetails(JSON.parse(ls));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        if (!Object.keys(loginDetails).length) return;
        const res = await axios.get(
          `http://localhost:3300/${loginDetails.id}/appointmentDetails`
        );
        console.log(res.data);
        setAppointmnetData({ data: res.data, isFetched: true });
      } catch {
        setModalDetails({
          isVisible: true,
          title: "Server Error! Please try again later",
          type: "error",
        });
      }
    };
    fetchAppointmentData();
  }, [loginDetails, appointmentUpdateView, state]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);

  if (appointmentData.isFetched) {
    return (
      <>
        {appointmentUpdateView ? (
          <UpdateAppointment
            updateAppointmendDataHandler={updateAppointmendDataHandler}
            loginDetails={loginDetails}
          />
        ) : (
          <>
            {appointmentData.data[0].length ? (
              <div className="flex-auto flex flex-col">
                <dir className=" mt-1 mb-1 text-[2rem]">Appointments</dir>
                <div className="flex-1 flex flex-row justify-center  ml-[2%] mr-[2%]">
                  <div className="flex-auto w-[25%] h-fit flex flex-col">
                    <div className="flex-auto m-1 rounded bg-white shdaow">
                      <div className="flex flex-row  p-2">
                        <img src={overviewIcon} width="24px" className="mr-1" />
                        Overview
                      </div>
                      <div className="p-2 font-[600]">
                        Pending appointments:{" "}
                        {appointmentData.data[2][0].pendingAppoint}
                      </div>
                      <div className="p-2 font-[600]">
                        Total appointments:{" "}
                        {appointmentData.data[1][0].totalAppoint}
                      </div>
                      <div className=" p-2 font-[600]">
                        Total Cost: {appointmentData.data[1][0].sumCost}
                      </div>
                    </div>
                  </div>
                  <div className="flex-auto w-[75%]">
                    <div className=" h-fit flex flex-row bg-[white] shadow rounded font-[600] m-1">
                      <div className=" flex-auto  rounded m-1 w-[20%] flex justify-center items-center">
                        DOCTOR
                      </div>
                      <div className="rounded flex-auto m-1 w-[20%] flex justify-center items-center">
                        SCHEDULE
                      </div>
                      <div className="rounded flex-auto m-1 w-[10%] flex justify-center items-center">
                        TYPE
                      </div>
                      <div className="rounded flex-auto m-1 w-[10%] flex justify-center items-center">
                        STATUS
                      </div>
                      <div className="rounded flex-auto m-1 w-[10%] flex justify-center items-center">
                        COST
                      </div>
                      <div className="rounded  flex-auto m-1 w-[20%] flex justify-center items-center">
                        NOTE
                      </div>
                      <div className="rounded  flex-auto m-1 w-[5%] flex justify-center items-center"></div>
                    </div>
                    {appointmentData.data[0].map((info) => {
                      return (
                        <AppointmentCard
                          info={info}
                          keys={info.appointment_id}
                          deleteHandler={deleteHandler}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-auto flex justify-center items-center">
                {modalDetails.isVisible && modalDetails.type === "error" && (
                  <ErrorModal
                    title={modalDetails.title}
                    closeModal={closeModal}
                  />
                )}
                No Appointment Details
              </div>
            )}
            <button
              className=" bg-[black] shadow-md p-5 m-10 rounded-full absolute bottom-0 right-0"
              onClick={updateAppointmendDataHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        {modalDetails.isVisible && modalDetails.type === "error" && (
          <ErrorModal title={modalDetails.title} closeModal={closeModal} />
        )}
        <LoadingAnimation />
      </>
    );
  }
};

export default AppointmentView;
