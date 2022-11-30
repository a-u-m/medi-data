import React, { useEffect, useState } from "react";
import axios from "axios";
import heightIcon from "../../assets/height.png";
import weightIcon from "../../assets/weight-loss.png";
import bloodIcon from "../../assets/blood-test.png";
import disabledIcon from "../../assets/disabled-person.png";

const PhysicalDisplay = (props) => {
  return (
    <>
      <div className="relative rounded w-[20rem] h-[18rem] m-2 flex justify-center items-center bg-[white]">
        <div className="absolute top-0 left-0 flex flex-rpw m-1">
          <img src={heightIcon} className="w-[24px] mr-1" />
          Height
        </div>
        <div className="">
          <div className="border border-black p-4 rounded">
            <div className="w-[10rem] text-[3rem] text-center focus:outline-none">
              {props.existingData.Height}
            </div>
            <div className="text-center text-[0.8rem]">Height(in cm)</div>
          </div>
        </div>
      </div>
      <div className="relative rounded w-[20rem] h-[18rem] m-2 flex justify-center items-center bg-[white]">
        <div className="absolute top-0 left-0 flex flex-rpw m-1">
          <img src={weightIcon} className="w-[24px] mr-1" />
          Weight
        </div>
        <div className="">
          <div className="border border-black p-4 rounded">
            <div className="w-[10rem] text-[3rem] text-center focus:outline-none">
              {props.existingData.Weight}
            </div>
            <div className="text-center text-[0.8rem]">Weight(in Kg)</div>
          </div>
        </div>
      </div>{" "}
      <div className="relative rounded w-[20rem] h-[18rem] m-2 flex justify-center items-center bg-[white]">
        <div className="absolute top-0 left-0 flex flex-rpw m-1">
          <img src={bloodIcon} className="w-[24px] mr-1" />
          Blood Group
        </div>
        <div className="">
          <div className="border border-black p-4 rounded">
            <div className="w-[10rem] text-[3rem] text-center focus:outline-none">
              {props.existingData.blood_group}
            </div>
            <div className="text-center text-[0.8rem]">Blood Group</div>
          </div>
        </div>
      </div>{" "}
      <div className="relative rounded w-[20rem] h-[18rem] m-2 flex justify-center items-center bg-[white]">
        <div className="absolute top-0 left-0 flex flex-rpw m-1">
          <img src={disabledIcon} className="w-[24px] mr-1" />
          Disability
        </div>
        <div className="">
          <div className="border border-black p-4 rounded">
            <div className="w-[10rem] text-[3rem] text-center focus:outline-none">
              {props.existingData.disability}
            </div>
            <div className="text-center text-[0.8rem]">Disablility</div>
          </div>
        </div>
      </div>
      <button
        className=" absolute bottom-0 right-0 m-2 p-2 px-4 rounded bg-[black] text-[white]"
        onClick={() => {
          props.sFrameHandler();
        }}
      >
        Edit Data
      </button>
    </>
  );
};

export default PhysicalDisplay;
