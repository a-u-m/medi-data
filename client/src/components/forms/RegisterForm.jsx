import React, { useState } from "react";
import InputA from "../UI/InputA";
import ContainerB from "../UI/ContainerB";
import HeadingA from "../UI/HeadingA";
import ButtonA from "../UI/ButtonA";
import PersonalDetails from "./PersonalDetails";
import RegistrationDetails from "./RegistrationDetails";
import axios from "axios";

const RegisterForm = (props) => {
  const [detailsValid, setDetailsValid] = useState(false);
  const [personalData, setPersonalData] = useState({});
  const [loginData, setLoginData] = useState({});
  const personalDataHandler = (res) => {
    setDetailsValid(true);
    setPersonalData(res);
  };
  const loginDataHandler = async (res) => {
    setLoginData(res);
    const regRes = await axios.post("http://localhost:3300/register", {
      loginDetails: res,
      personalDetails: personalData,
    });
    props.pageDashHandler(res);
  };
  const backHandler = () => {
    setDetailsValid(false);
  };
  return (
    <React.Fragment>
      {!detailsValid && (
        <PersonalDetails
          loginHandler={props.loginHandler}
          personalDataHandler={personalDataHandler}
        />
      )}
      {detailsValid && (
        <RegistrationDetails
          loginHandler={props.loginHandler}
          personalDetailsBackHandler={backHandler}
          loginDataHandler={loginDataHandler}
        />
      )}
    </React.Fragment>
  );
};

export default RegisterForm;
