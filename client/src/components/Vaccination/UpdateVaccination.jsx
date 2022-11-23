import React, { useState } from "react";
import addVacIcon from "../../assets/syringe.png";
import validator from "validator";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import InvalidModal from "../UI/InvalidModal";
import ErrorModal from "../UI/ErrorModal";

const UpdateVaccination = (props) => {
  const [updateData, setUpdateData] = useState({
    patient_id: props.loginDetails.id,
    vaccination_id: uuidv4(),
    vaccination_name: "",
    vaccination_date: "",
    vac_update_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    vac_cost: "",
    dose_no: "",
    net_doses: "",
    vac_for: "",
  });
  const [modalDetails, setModalDetails] = useState({
    isVisible: false,
    title: "",
    type: "",
  });
  const closeModal = () => {
    setModalDetails({ isVisible: false, title: "", type: "" });
  };
  const submitHandler = async () => {
    if (
      // validator.is(updateData.doctor) &&
      updateData.vaccination_name.length &&
      // validator.isAlphanumericLocales(updateData.status) &&
      // validator.isAlphanumericLocales(updateData.type) &&
      updateData.vaccination_date.length &&
      updateData.vac_cost.length &&
      updateData.dose_no.length &&
      updateData.net_doses.length
    ) {
      try {
        const res = await axios.post(
          `http://localhost:3300/vaccination/add`,
          updateData
        );
        console.log(res);
        props.updateVacHandler();
      } catch (err) {
        console.log(err);
        setModalDetails({
          isVisible: true,
          title: "Server Error! Please try again later",
          type: "error",
        });
      }
    } else {
      setModalDetails({
        isVisible: true,
        title: "Invalid Inputs! Please enter correct details",
        type: "invalid",
      });
    }
  };
  return (
    <>
      {modalDetails.isVisible && modalDetails.type === "error" && (
        <ErrorModal title={modalDetails.title} closeModal={closeModal} />
      )}
      {modalDetails.isVisible && modalDetails.type === "invalid" && (
        <InvalidModal title={modalDetails.title} closeModal={closeModal} />
      )}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[25rem] h-[20rem] p-3 flex flex-col items-center bg-[white] rounded shadow-md">
          <div className="w-full flex flex-row flex-auto h-[10%] items-center text-[1.2rem]">
            <img src={addVacIcon} width="28px" className="mr-2" />
            Add Vaccination
          </div>
          <div className="w-full flex flex-auto h-[10%]">
            <input
              type="text"
              className="border border-black m-1 flex-1 rounded focus:outline-[black] text-[1rem] placeholder:text-[#343434cd] pl-1"
              placeholder="vaccine name"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, vaccination_name: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex flex-row m-1 w-full flex-auto h-[10%]">
            <input
              type="Number"
              className="border border-black m-1 flex-auto w-[50%] rounded focus:outline-[black] text-[1rem] placeholder:text-[#343434cd] pl-1"
              placeholder="dose number"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, dose_no: e.target.value };
                });
              }}
            />
            <input
              type="Number"
              className="border border-black m-1 flex-auto w-[50%] rounded focus:outline-[black] text-[1rem] placeholder:text-[#343434cd] pl-1"
              placeholder="net doses"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, net_doses: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex flex-row m-1 w-full flex-auto h-[10%]">
            <input
              type="date"
              className="border border-black m-1 flex-auto w-[70%] rounded focus:outline-[black] text-[1rem] placeholder:text-[#343434cd] pl-1"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, vaccination_date: e.target.value };
                });
              }}
            />
            <input
              type="Number"
              className="border border-black m-1 flex-auto w-[30%] rounded focus:outline-[black] text-[1rem] placeholder:text-[#343434cd] pl-1"
              placeholder="cost"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, vac_cost: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex flex-row m-1 w-full flex-auto h-[10%]">
            <input
              type="text"
              className="border border-black m-1 flex-auto w-[50%] rounded focus:outline-[black] text-[1rem] placeholder:text-[#343434cd] pl-1"
              placeholder="type"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, type: e.target.value };
                });
              }}
            />
            <input
              type="text"
              className="border border-black m-1 flex-auto w-[50%] rounded focus:outline-[black] text-[1rem] placeholder:text-[#343434cd] pl-1"
              placeholder="vaccination for"
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, vac_for: e.target.value };
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
        onClick={props.updateVacHandler}
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

export default UpdateVaccination;
