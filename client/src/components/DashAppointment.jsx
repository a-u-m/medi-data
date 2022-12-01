import React, { useEffect, useState } from "react";
import CardA from "./UI/CardA";
import medicalIcon from "../assets/medical-appointment2.png";
import axios from "axios";

const DashAppointment = (props) => {
  const [postData, setPostData] = useState({
    currDate: new Date().toISOString().slice(0, 19).replace("T", " "),
    patient_id: JSON.parse(localStorage.getItem("loginState")).id,
  });
  const [recieveData, setRecieveData] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.post(
        `http://localhost:3300/appointment/upcoming`,
        postData
      );
      console.log(res.data);
      setRecieveData(res.data[0]);
      if (res.data.length) {
        setIsFetched(true);
      }
    };
    fetchData();
  }, []);

  return (
    <CardA style="basis-1/4 flex flex-col p-3 relative">
      <div className="basis-1/12 flex">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clip-rule="evenodd"
          />
        </svg> */}
        <div className="flex flex-row">
          <img src={medicalIcon} width="28px" />
          <div className="ml-2">Upcoming Appointment</div>
        </div>
      </div>
      <div className="flex-auto flex flex-col justify-around items-center border-[2px]  rounded">
        {isFetched ? (
          <>
            {" "}
            <div className="flex-auto w-full flex flex-row justify-around p-3">
              <div className="font-[500] flex-auto w-[50%] text-center">
                Doctor
              </div>
              <div className="font-[500] flex-auto w-[50%] text-center">
                Appointment on
              </div>
            </div>
            <div className="flex-auto w-full flex flex-row justify-around p-3">
              <div className="font-[400] flex-auto w-[50%] text-center">
                {recieveData.doctor_name}
              </div>
              <div className="font-[400] flex-auto w-[50%] text-center">
                {new Date(recieveData.appointSchedule).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="">no upcoming appointments</div>
        )}
      </div>
    </CardA>
  );
};

export default DashAppointment;
