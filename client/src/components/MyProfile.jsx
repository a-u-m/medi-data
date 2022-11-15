import React from "react";
import CardA from "./UI/CardA";
import icon from "../assets/profile2.png";
import contactIcon from "../assets/viber.png";
import emailIcon from "../assets/email.png";
import settingIcon from "../assets/settings1.png";

const MyProfile = (props) => {
  return (
    <CardA style="basis-3/4 flex flex-col p-3 ">
      <div className="basis-1/12 flex justify-between items-center">
        <div className="flex flex-row">
          <img src={icon} width="28px" />
          <div className="ml-2">My Profile</div>
        </div>
        <img
          src={settingIcon}
          width="20px"
          onClick={props.profileUpdateHandler}
        />
      </div>
      <div className="flex flex-row mt-1">
        <div className="border flex-auto border-[#0000004b] rounded  flex justify-center items-center text-[2rem] text font-[300] tracking-wide mr-1">
          {props.profileView.firstname === null
            ? "N/A"
            : props.profileView.firstname}{" "}
          {props.profileView.lastname === null
            ? "N/A"
            : props.profileView.lastname}
        </div>
        <div className="border flex-auto border-[#0000004b] rounded  flex flex-col justify-center items-center text-[1.5rem] text font-[300] tracking-wide ml-1">
          {props.profileView.username === null
            ? "N/A"
            : props.profileView.username}
          {/* <p className="text-[0.7rem]">username</p> */}
        </div>
      </div>

      <div className=" basis-1/12 flex flex-row items-center mt-1">
        <div className="flex-auto p-1 flex flex-row flex-wrap rounded mr-1 font-[300] border border-[#0000004b] justify-center items-center">
          {/* <span className="font-[500]">contact:</span>{" "} */}
          <img src={contactIcon} width="24px" />
          <p className="ml-2">
            {props.profileView.contact_no === null
              ? "N/A"
              : props.profileView.contact_no}
          </p>
        </div>
        <div className="flex-auto p-1 flex flex-row flex-wrap rounded mr-1 font-[300] border border-[#0000004b] justify-center items-center">
          {/* <span className="font-[500]">contact:</span>{" "} */}
          <img src={emailIcon} width="24px" />
          <p className="ml-2">
            {props.profileView.email === null ? "N/A" : props.profileView.email}
          </p>
        </div>
      </div>

      <div className=" basis-4/6 grid grid-cols-2 gap-2 mt-1">
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          {props.profileView.age === null ? "N/A" : props.profileView.age}
          <p className="text-[1rem] font-[300] ">age</p>
        </div>
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          {props.profileView.blood_grp === null
            ? "N/A"
            : props.profileView.blood_grp}
          <p className="text-[1rem] font-[300]">blood group</p>
        </div>
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          {props.profileView.gender === null ? "N/A" : props.profileView.gender}
          <p className="text-[1rem] font-[300]">gender</p>
        </div>
        <div className="border border-[#0000004b] rounded flex flex-col justify-center items-center text-[2rem]">
          {props.profileView.disablity === null
            ? "N/A"
            : props.profileView.disablity}
          <p className="text-[1rem] font-[300]">disability</p>
        </div>
      </div>
    </CardA>
  );
};

export default MyProfile;
