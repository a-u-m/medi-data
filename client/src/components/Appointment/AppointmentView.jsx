import React from "react";
import AppointmentCard from "./AppointmentCard";

const AppointmentView = (props) => {
  return (
    <>
      {props.appointmentData.data !== undefined ? (
        <div className="flex-auto flex flex-col">
          <dir className=" mt-1 mb-1 text-[2rem]">Appointments</dir>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full h-fit flex flex-row">
              <div className=" flex-auto pt-2 pb-2 ml-2 rounded bg-[white] shadow-md m-1 w-[20%] text-[1.5rem] flex justify-center items-center">
                Doctor
              </div>
              <div className="rounded bg-[white] shadow-md flex-auto m-1 w-[20%] text-[1.5rem] flex justify-center items-center">
                Schedule
              </div>
              <div className="rounded bg-[white] shadow-md flex-auto m-1 w-[10%] text-[1.5rem] flex justify-center items-center">
                Type
              </div>
              <div className="rounded bg-[white] shadow-md flex-auto m-1 w-[10%] text-[1.5rem] flex justify-center items-center">
                Status
              </div>
              <div className="rounded bg-[white] shadow-md flex-auto m-1 w-[10%] text-[1.5rem] flex justify-center items-center">
                Cost
              </div>
              <div className="rounded bg-[white] mr-2 shadow-md flex-auto m-1 w-[20%] text-[1.5rem] flex justify-center items-center">
                Note
              </div>
            </div>
            <AppointmentCard />
          </div>
        </div>
      ) : (
        <div className="flex-auto flex justify-center items-center">
          No Appointment Details
        </div>
      )}
      <button
        className=" bg-[black] shadow-md p-5 m-10 rounded-full absolute bottom-0 right-0"
        onClick={props.updateAppointmendDataHandler}
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
  );
};

export default AppointmentView;
