import React, { useEffect, useState } from "react";
import axios from "axios";
import heightIcon from "../../assets/height.png";
import weightIcon from "../../assets/weight-loss.png";
import bloodIcon from "../../assets/blood-test.png";
import disabledIcon from "../../assets/disabled-person.png";

const PhysicalUpdate = (props) => {
  const [updateData, setUpdateData] = useState({
    patient_id: JSON.parse(localStorage.getItem("loginState")).id,
    height: props.existingData.Height,
    weight: props.existingData.Weight,
    disability: props.existingData.disability,
    blood_grp: props.existingData.blood_group,
  });
  const updateHandler = async () => {
    console.log(updateData);
    try {
      let res = await axios.post(
        `http://localhost:3300/physical/update`,
        updateData
      );
      if (res.status === 200) {
        console.log("successful");
        props.sFrameHandler();
      } else {
        console.log("server error");
      }
    } catch {
      console.log("error");
    }
  };
  return (
    <>
      <div className="relative rounded w-[20rem] h-[18rem] m-2 flex justify-center items-center bg-[white]">
        <div className="absolute top-0 left-0 flex flex-rpw m-1">
          <img src={heightIcon} className="w-[24px] mr-1" />
          Height(edit)
        </div>
        <div className="">
          <div className="border border-black p-4 rounded">
            <input
              type="text"
              className="w-[10rem] text-[3rem] text-center focus:outline-none"
              placeholder={props.existingData.Height}
              value={updateData.height}
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, height: e.target.value };
                });
              }}
            />
            <div className="text-center text-[0.8rem]">Height(in cm)</div>
          </div>
        </div>
      </div>
      <div className="relative rounded w-[20rem] h-[18rem] m-2 flex justify-center items-center bg-[white]">
        <div className="absolute top-0 left-0 flex flex-rpw m-1">
          <img src={weightIcon} className="w-[24px] mr-1" />
          Weight(edit)
        </div>
        <div className="">
          <div className="border border-black p-4 rounded">
            <input
              type="text"
              className="w-[10rem] text-[3rem] text-center focus:outline-none"
              placeholder={props.existingData.Weight}
              value={updateData.weight}
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, weight: e.target.value };
                });
              }}
            />
            <div className="text-center text-[0.8rem]">Weight(in Kg)</div>
          </div>
        </div>
      </div>{" "}
      <div className="relative rounded w-[20rem] h-[18rem] m-2 flex justify-center items-center bg-[white]">
        <div className="absolute top-0 left-0 flex flex-rpw m-1">
          <img src={bloodIcon} className="w-[24px] mr-1" />
          Blood Group(edit)
        </div>
        <div className="">
          <div className="border border-black p-4 rounded">
            <input
              type="text"
              className="w-[10rem] text-[3rem] text-center focus:outline-none"
              placeholder={props.existingData.blood_grp}
              value={updateData.blood_grp}
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, blood_grp: e.target.value };
                });
              }}
            />
            <div className="text-center text-[0.8rem]">Blood Group</div>
          </div>
        </div>
      </div>{" "}
      <div className="relative rounded w-[20rem] h-[18rem] m-2 flex justify-center items-center bg-[white]">
        <div className="absolute top-0 left-0 flex flex-rpw m-1">
          <img src={disabledIcon} className="w-[24px] mr-1" />
          Disability(edit)
        </div>
        <div className="">
          <div className="border border-black p-4 rounded">
            <input
              type="text"
              className="w-[10rem] text-[3rem] text-center focus:outline-none"
              placeholder="none"
              value={props.existingData.disability}
              onChange={(e) => {
                setUpdateData((prevState) => {
                  return { ...prevState, disability: e.target.value };
                });
              }}
            />
            <div className="text-center text-[0.8rem]">Disablility</div>
          </div>
        </div>
      </div>
      <button
        className=" absolute bottom-0 right-0 m-2 p-2 px-4 rounded bg-[black] text-[white]"
        onClick={updateHandler}
      >
        Update Data
      </button>
    </>
  );
};

export default PhysicalUpdate;
