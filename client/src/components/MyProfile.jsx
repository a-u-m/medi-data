import React from "react";
import CardA from "./UI/CardA";
import icon from "../assets/profile2.png";
import contactIcon from "../assets/viber.png";
import emailIcon from "../assets/email.png";

const MyProfile = (props) => {
  return (
    <CardA style="basis-2/3 flex flex-col p-3 ">
      <div className="basis-1/12 flex items-center">
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
        <img src={icon} width="28px" />
        <div className="ml-2">My Profile</div>
      </div>
      <div className="flex flex-row mt-1">
        <div className="border flex-auto border-[#0000004b] rounded  flex justify-center items-center text-[2rem] text font-[300] tracking-wide mr-1">
          {props.personalDetails.firstname} {props.personalDetails.lastname}
        </div>
        <div className="border flex-auto border-[#0000004b] rounded  flex flex-col justify-center items-center text-[1.5rem] text font-[300] tracking-wide ml-1">
          {props.loginDetails.username}
          {/* <p className="text-[0.7rem]">username</p> */}
        </div>
      </div>

      <div className=" basis-1/12 flex flex-row items-center mt-1">
        <div className="flex-auto p-1 flex flex-row flex-wrap rounded mr-1 font-[300] border border-[#0000004b] justify-center items-center">
          {/* <span className="font-[500]">contact:</span>{" "} */}
          <img src={contactIcon} width="24px" />
          <p className="ml-2">{props.personalDetails.contact_no}</p>
        </div>
        <div className="flex-auto p-1 flex flex-row flex-wrap rounded mr-1 font-[300] border border-[#0000004b] justify-center items-center">
          {/* <span className="font-[500]">contact:</span>{" "} */}
          <img src={emailIcon} width="24px" />
          <p className="ml-2">{props.personalDetails.email}</p>
        </div>
      </div>
      <div className=" basis-4/6 grid grid-cols-2 gap-2 mt-1">
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          {props.personalDetails.age}
          <p className="text-[1rem] font-[300] ">age</p>
        </div>
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          -<p className="text-[1rem] font-[300]">blood group</p>
        </div>
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          -<p className="text-[1rem] font-[300]">gender</p>
        </div>
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          -<p className="text-[1rem] font-[300]">disability</p>
        </div>
      </div>
    </CardA>
  );
};

export default MyProfile;
