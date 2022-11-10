import React, { useState } from "react";
import InputA from "../UI/InputA";
import ContainerB from "../UI/ContainerB";
import HeadingA from "../UI/HeadingA";
import ButtonA from "../UI/ButtonA";
import validator from "validator";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const RegistrationDetails = (props) => {
  const [usernameDetails, setUsernameDetails] = useState({
    value: "",
    isValid: false,
  });
  const [passwordDetails, setPasswordDetail] = useState({
    value: "",
    isValid: false,
  });
  const registerHandler = async () => {
    const res = await axios.post("http://localhost:3300/api/exCredentials", {
      username: usernameDetails.value,
    });
    console.log(res.data);
    if (
      usernameDetails.isValid &&
      passwordDetails.isValid &&
      !res.data.length
    ) {
      props.loginDataHandler({
        username: usernameDetails.value,
        password: passwordDetails.value,
        patient_id: uuidv4(),
        registrationDate: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      });
    } else {
      console.log("something isnt right with the details");
    }
  };
  const usernameValidatior = (e) => {
    if (
      !validator.isEmpty(e.target.value) &&
      validator.isAlphanumeric(e.target.value)
    ) {
      setUsernameDetails((prevState) => {
        return { ...prevState, value: e.target.value, isValid: true };
      });
    }
  };
  const passwordValidator = (e) => {
    if (!validator.isEmpty(e.target.value)) {
      setPasswordDetail((prevState) => {
        return { ...prevState, value: e.target.value, isValid: true };
      });
    }
  };
  return (
    <ContainerB className="w-[23rem] h-fit p-2">
      <HeadingA className="text-center">Last Step !</HeadingA>
      <InputA
        placeholder="username"
        type="text"
        className="w-full mb-1 mt-2"
        onChange={usernameValidatior}
      />
      <InputA
        placeholder="password"
        type="text"
        className="w-full mb-1 mt-2"
        onChange={passwordValidator}
      />
      <div className="flex w-full mt-1 justify-between">
        <ButtonA
          content="Back"
          className="w-1/2 mr-1 mb-1 mt-2 hover:bg-[#545454e5] bg-[#0d0d0d]"
          onClick={props.personalDetailsBackHandler}
        />
        <ButtonA
          content="Register"
          className="w-1/2 ml-1 mb-1 mt-2 hover:bg-[#545454e5] bg-[#0d0d0d]"
          onClick={registerHandler}
        />
      </div>
    </ContainerB>
  );
};

export default RegistrationDetails;
