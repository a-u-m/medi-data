import React from "react";

const AppointmentCard = (props) => {
  return (
    <div className=" w-full h-fit mt-1 flex flex-row">
      <div className=" flex-auto pt-2 pb-2 ml-2 rounded bg-[white] shadow-md m-1 w-[20%] text-[1.5rem] flex justify-center items-center">
        {props.doctor_name}
      </div>
      <div className="rounded bg-[white] shadow-md flex-auto m-1 w-[20%] text-[1.5rem] flex justify-center items-center">
        {props.appointSchedule}
      </div>
      <div className="rounded bg-[white] shadow-md flex-auto m-1 w-[10%] text-[1.5rem] flex justify-center items-center">
        {props.appointment_type}
      </div>
      <div className="rounded bg-[white] shadow-md flex-auto m-1 w-[10%] text-[1.5rem] flex justify-center items-center">
        {props.appointment_status}
      </div>
      <div className="rounded bg-[white] shadow-md flex-auto m-1 w-[10%] text-[1.5rem] flex justify-center items-center">
        {props.cost}
      </div>
      <div className="rounded bg-[white] mr-2 shadow-md flex-auto m-1 w-[20%] text-[1.5rem] flex justify-center items-center">
        {props.note}
      </div>
    </div>
  );
};

export default AppointmentCard;
