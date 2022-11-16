import React, { useState } from "react";
import CardA from "./UI/CardA";
import axios from "axios";
import icon from "../assets/profile2.png";
import contactIcon from "../assets/viber.png";
import emailIcon from "../assets/email.png";
import settingIcon from "../assets/settings1.png";
import validator from "validator";
import InvalidModal from "./UI/InvalidModal";
import ErrorModal from "./UI/ErrorModal";
import { useNavigate } from "react-router-dom";

const UpdateProfile = (props) => {
  const navigate = useNavigate();
  const [modalDetails, setModalDetails] = useState({
    isVisible: false,
    title: "",
    type: "",
  });
  const closeModal = () => {
    setModalDetails({ isVisible: false, title: "", type: "" });
  };
  const [updateData, setUpdateData] = useState({
    firstname: props.profileView.firstname,
    lastname: props.profileView.lastname,
    age: props.profileView.age,
    contact: props.profileView.contact_no,
    email: props.profileView.email,
    blood_grp: props.profileView.blood_grp,
    gender: props.profileView.gender,
    disability: props.profileView.disablity,
    patient_id: props.profileView.patient_id,
  });
  const saveSubmitHandler = async () => {
    console.log(updateData);
    if (
      validator.isAlpha(updateData.firstname) &&
      updateData.firstname.length &&
      validator.isAlpha(updateData.lastname) &&
      updateData.lastname.length &&
      parseInt(updateData.age) >= 1 &&
      validator.isEmail(updateData.email)
      //   (validator.isAlpha(updateData.blood_grp) ||
      //     updateData.blood_grp === null) &&
      //   (validator.isAlpha(updateData.gender) || updateData.gender === null) &&
      //   (validator.isAlpha(updateData.disability) ||
      //     updateData.disability === null)
    ) {
      try {
        const res = await axios.post(
          `http://localhost:3300/profileupdate`,
          updateData
        );
        if (res.data.affectedRows) {
          props.profileUpdateHandler();
        } else {
          setModalDetails({
            isVisible: true,
            title: "Server Down! Please try again later",
            type: "error",
          });
        }
      } catch {
        setModalDetails({
          isVisible: true,
          title: "Server Down! Please try again later",
          type: "error",
        });
      }
    } else {
      setModalDetails({
        isVisible: true,
        title: "Invalid Inputs! Please enter valid details",
        type: "invalid",
      });
    }
  };
  return (
    <CardA style="basis-3/4 flex flex-col p-3 ">
      {modalDetails.isVisible && modalDetails.type === "invalid" && (
        <InvalidModal title={modalDetails.title} closeModal={closeModal} />
      )}
      {modalDetails.isVisible && modalDetails.type === "error" && (
        <ErrorModal title={modalDetails.title} closeModal={closeModal} />
      )}
      <div className="basis-1/12 flex justify-between items-center">
        <div className="flex flex-row">
          <img src={icon} width="28px" />
          <div className="ml-2">My Profile (edit)</div>
        </div>
        <img
          src={settingIcon}
          width="20px"
          onClick={props.profileUpdateHandler}
        />
      </div>
      <div className="flex flex-row mt-1">
        {/* <div className="border flex-auto border-[#0000004b] rounded  flex justify-center items-center text-[2rem] text font-[300] tracking-wide mr-1">
          {props.personalDetails.firstname}
        </div> */}
        <input
          type="text"
          className="border w-[50%] border-[#0000004b] rounded  text-[2rem] text font-[300] tracking-wide mr-1 text-center"
          placeholder={
            props.profileView.firstname === null
              ? "N/A"
              : props.profileView.firstname
          }
          value={updateData.firstname}
          onChange={(e) => {
            setUpdateData((prevState) => {
              return { ...prevState, firstname: e.target.value };
            });
          }}
        />
        <input
          type="text"
          className="border w-[50%] border-[#0000004b] rounded  text-[2rem] text font-[300] tracking-wide mr-1 text-center"
          placeholder={
            props.profileView.lastname === null
              ? "N/A"
              : props.profileView.lastname
          }
          value={updateData.lastname}
          onChange={(e) => {
            setUpdateData((prevState) => {
              return { ...prevState, lastname: e.target.value };
            });
          }}
        />
      </div>

      <div className=" basis-1/12 flex flex-row items-center mt-1">
        <div className="w-5/12 p-1 flex flex-col flex-wrap md:flex-row md:flex-wrap rounded mr-1 font-[300] border border-[#0000004b] justify-center items-center">
          {/* <span className="font-[500]">contact:</span>{" "} */}
          <img src={contactIcon} width="24px" />
          <input
            className="outline-none text-center w-[80%] ml-1"
            placeholder={
              props.profileView.contact_no === null
                ? "N/A"
                : props.profileView.contact_no
            }
            value={updateData.contact}
            onChange={(e) => {
              setUpdateData((prevState) => {
                return { ...prevState, contact: e.target.value };
              });
            }}
          />
        </div>
        <div className="w-7/12 p-1 flex flex-col flex-wrap md:flex-row md:flex-wrap rounded mr-1 font-[300] border border-[#0000004b] justify-center items-center">
          {/* <span className="font-[500]">contact:</span>{" "} */}
          <img src={emailIcon} width="24px" />
          <input
            className="outline-none text-center w-[80%] ml-1"
            placeholder={
              props.profileView.email === null ? "N/A" : props.profileView.email
            }
            value={updateData.email}
            onChange={(e) => {
              setUpdateData((prevState) => {
                return { ...prevState, email: e.target.value };
              });
            }}
          />
        </div>
      </div>
      <div className=" basis-4/6 grid grid-cols-2 gap-2 mt-1">
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          <input
            type="number"
            className="w-full outline-none text-center"
            placeholder={
              props.profileView.age === null ? "N/A" : props.profileView.age
            }
            value={updateData.age}
            onChange={(e) => {
              setUpdateData((prevState) => {
                return { ...prevState, age: e.target.value };
              });
            }}
          />
          <p className="text-[1rem] font-[300] ">age</p>
        </div>
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          <input
            type="text"
            className="w-[100%] outline-none text-center"
            placeholder={
              props.profileView.blood_grp === null
                ? "N/A"
                : props.profileView.blood_grp
            }
            value={updateData.blood_grp}
            onChange={(e) => {
              setUpdateData((prevState) => {
                return { ...prevState, blood_grp: e.target.value };
              });
            }}
          />
          <p className="text-[1rem] font-[300]">blood group</p>
        </div>
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          <input
            type="text"
            className="w-[100%] outline-none text-center"
            placeholder={
              props.profileView.gender === null
                ? "N/A"
                : props.profileView.gender
            }
            value={updateData.gender}
            onChange={(e) => {
              setUpdateData((prevState) => {
                return { ...prevState, gender: e.target.value };
              });
            }}
          />
          <p className="text-[1rem] font-[300]">gender</p>
        </div>
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          <input
            type="text"
            className="w-[100%] outline-none text-center"
            placeholder={
              props.profileView.disablity === null
                ? "N/A"
                : props.profileView.disablity
            }
            value={updateData.disability}
            onChange={(e) => {
              setUpdateData((prevState) => {
                return { ...prevState, disability: e.target.value };
              });
            }}
          />
          <p className="text-[1rem] font-[300]">disability</p>
        </div>
      </div>
      <button
        className="border border-black mt-2 rounded-lg bg-[#000000cd] text-[white] font-[600] hover:bg-[#000000a1]"
        onClick={saveSubmitHandler}
      >
        save
      </button>
    </CardA>
  );
};

export default UpdateProfile;
