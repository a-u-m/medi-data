import React from "react";
import CardA from "./UI/CardA";
import prescriptionIcon from "../assets/prescription.png";
import traitIcon from "../assets/height.png";
import medicalHistoryIcon from "../assets/medical-history.png";
import appointmentIcon from "../assets/appointment.png";
import testIcon from "../assets/blood-sample.png";
import pcrIcon from "../assets/pcr-test.png";
import vaccineIcon from "../assets/vaccine.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const DashCards = (prop) => {
  const navigate = useNavigate();
  const { dates } = prop;


  if (dates.length !== 0) {
    return (
      <>
        <CardA
          style="flex flex-col p-3 justify-between hover:bg-[#f2f2f2] cursor-pointer p-3"
          onClick={() => {
            navigate("/prescription");
          }}
        >
          <div className=" flex flex-row items-center">
            <img src={prescriptionIcon} width="28px" />
            <div className="ml-2">Prescriptions</div>
          </div>
          <div className="flex flex-col items-center pl-5 pr-5 text-[1.1rem]">
            {/* <div className="text-center">
            Your added prescription are stored with care
          </div> */}
            <div className="text-center">
              See or update details like Medication, Course Duration and
              prescribed Intervals for Medication.
            </div>
          </div>
          <div className="flex flex-row items-center text-[0.7rem] cursor-pointer">
            <p className="italic">last updated:{dates[0].date}</p>
          </div>
        </CardA>

        <CardA
          style="flex flex-col p-3 justify-between hover:bg-[#f2f2f2] cursor-pointer"
          onClick={() => {
            navigate("/physicals");
          }}
        >
          <div className=" flex flex-row items-center">
            <img src={traitIcon} width="28px" />
            <div className="ml-2">Physical traits</div>
          </div>
          <div className="flex flex-col items-center pl-5 pr-5 text-[1.1rem]">
            <div className="text-center">
              See or update your physical details like height, weight and other
              features.
            </div>
          </div>
          <div className="flex flex-row items-center text-[0.7rem]">
            <p className="italic">last updated:{dates[0].date}</p>
          </div>
        </CardA>

        <CardA style="flex flex-col p-3 justify-between hover:bg-[#f2f2f2] cursor-pointer" onClick={() => { navigate("/disease") }}>
          <div className=" flex flex-row items-center">
            <img src={medicalHistoryIcon} width="28px" />
            <div className="ml-2">Medical History</div>
          </div>
          <div className="flex flex-col items-center pl-5 pr-5 text-[1.1rem]">
            <div className="text-center">
              See or update Medical History like past illness-diseases and the
              doctor consulted.
            </div>
          </div>
          <div className="flex flex-row items-center text-[0.7rem]">
            <p className="italic">last updated:{dates[0].date}</p>
          </div>
        </CardA>

        <CardA
          style="flex flex-col p-3 justify-between hover:bg-[#f2f2f2] cursor-pointer"
          onClick={() => {
            navigate("/appointment");
          }}
        >
          <div className=" flex flex-row items-center">
            <img src={appointmentIcon} width="28px" />
            <div className="ml-2">Appointments</div>
          </div>
          <div className="flex flex-col items-center pl-5 pr-5 text-[1.1rem]">
            <div className="text-center">
              See or update details like appointment schedule, status, and
              doctor's name.
            </div>
          </div>
          <div className="flex flex-row items-center text-[0.7rem]">
            <p className="italic">last updated:{dates[0].appointRegDate}</p>
          </div>
        </CardA>

        <CardA
          style="flex flex-col p-3 justify-between hover:bg-[#f2f2f2] cursor-pointer"
          onClick={() => {
            navigate("/test");
          }}
        >
          <div className=" flex flex-row items-center">
            <img src={testIcon} width="28px" />
            <div className="ml-2">Medical Tests</div>
          </div>
          <div className="flex flex-col items-center pl-5 pr-5 text-[1.1rem]">
            <div className="text-center">
              See details like type of test undertaken, results, treatment
              provider, doctor consulted and cost or update with new ones.
            </div>
          </div>
          <div className="flex flex-row items-center text-[0.7rem]">
            <p className="italic">last updated:{dates[0].date}</p>
          </div>
        </CardA>

        <CardA
          style="flex flex-col p-3 justify-between hover:bg-[#f2f2f2] cursor-pointer"
          onClick={() => {
            navigate("/vaccination");
          }}
        >
          <div className=" flex flex-row items-center">
            <img src={vaccineIcon} width="28px" />
            <div className="ml-2">Vaccination History</div>
          </div>
          <div className="flex flex-col items-center pl-5 pr-5 text-[1.1rem]">
            <div className="text-center">
              See past history of details like type of vaccination undertaken,
              date or update with new ones.
            </div>
          </div>
          <div className="flex flex-row items-center text-[0.7rem]">
            <p className="italic">last updated:{dates[0].vacUpdateDate}</p>
          </div>
        </CardA>
      </>
    );
  }

};

export default DashCards;
