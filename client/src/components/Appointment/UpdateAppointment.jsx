import React, { useState } from "react";
import addIcon from "../../assets/add.png";
import validator from "validator";

const UpdateAppointment = (props) => {
  const [updateData, setUpdateData] = useState({
    doctor: "",
    type: "",
    status: "",
    schedule: "",
    cost: "",
    note: "",
  });
  const submitHandler = () => {
    if (
      validator.isAlpha(updateData.doctor) &&
      updateData.doctor.length &&
      validator.isAlpha(updateData.status) &&
      updateData.status.length &&
      validator.isAlpha(updateData.type) &&
      updateData.type.length &&
      updateData.schedule.length &&
      validator.isNumeric(updateData.cost) &&
      updateData.cost.length
    ) {
      console.log(updateData);
    } else {
      console.log("invalid");
    }
  };
  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[25rem] h-[25rem] p-3 flex flex-col items-center bg-[white] rounded shadow-md">
          <div className="w-full flex flex-row flex-auto h-[10%] items-center text-[1.5rem]">
            <img src={addIcon} width="40px" className="mr-2" />
            Add Prescription
          </div>
          <div className="w-full flex flex-auto h-[10%]">
            <input
              type="text"
              className="border border-black m-1 flex-1 rounded focus:outline-[black] text-[1.5rem] placeholder:text-[#343434cd] p-1"
              placeholder="Doctor's Name"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, doctor: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex flex-row m-1 w-full flex-auto h-[10%]">
            <input
              type="text"
              className="border border-black m-1 flex-auto w-[50%] rounded focus:outline-[black] text-[1.5rem] placeholder:text-[#343434cd] p-1"
              placeholder="type"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, type: e.target.value };
                });
              }}
            />
            <input
              type="text"
              className="border border-black m-1 flex-auto w-[50%] rounded focus:outline-[black] text-[1.5rem] placeholder:text-[#343434cd] p-1"
              placeholder="status"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, status: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex flex-row m-1 w-full flex-auto h-[10%]">
            <input
              type="datetime-local"
              className="border border-black m-1 flex-auto w-[70%] rounded focus:outline-[black] text-[1.5rem] placeholder:text-[#343434cd] p-1"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, schedule: e.target.value };
                });
              }}
            />
            <input
              type="text"
              className="border border-black m-1 flex-auto w-[30%] rounded focus:outline-[black] text-[1.5rem] placeholder:text-[#343434cd] p-1"
              placeholder="cost"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, cost: e.target.value };
                });
              }}
            />
          </div>
          <div className="w-full flex flex-auto h-[30%]">
            <textarea
              className="border border-black m-1 flex-1 rounded focus:outline-[black] resize-none placeholder:text-[#343434cd] p-1"
              placeholder="Add a note..."
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, note: e.target.value };
                });
              }}
            />
          </div>
          <button
            className="rounded-lg bg-[#000000] text-[white] w-full flex flex-auto justify-center items-center text-[1rem] h-[5%] border border-black mt-2"
            onClick={submitHandler}
          >
            Add
          </button>
        </div>
      </div>
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
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </button>
    </>
  );
};

export default UpdateAppointment;
