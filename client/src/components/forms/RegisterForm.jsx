import React, { useState, useContext } from "react";
import LoginContext from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import InputA from "../UI/InputA";
import ContainerB from "../UI/ContainerB";
import HeadingA from "../UI/HeadingA";
import ButtonA from "../UI/ButtonA";
import PersonalDetails from "./PersonalDetails";
import RegistrationDetails from "./RegistrationDetails";
import axios from "axios";
import ErrorModal from "../UI/ErrorModal";

const RegisterForm = (props) => {
  const ctx = useContext(LoginContext);
  const navigate = useNavigate();
  const [detailsValid, setDetailsValid] = useState(false);
  const [personalData, setPersonalData] = useState({});
  const [modalDetails, setModalDetails] = useState({
    isVisible: false,
    title: "",
    type: "",
  });
  const closeModal = () => {
    setModalDetails({ isVisible: false, title: "", type: "" });
  };
  const personalDataHandler = (res) => {
    setDetailsValid(true);
    setPersonalData(res);
  };
  const loginDataHandler = async (res) => {
    try {
      const regRes = await axios.post("http://localhost:3300/register", {
        loginDetails: res,
        personalDetails: personalData,
      });
      if (regRes.data.affectedRows) {
        ctx.setLoginDetails((preState) => {
          return {
            ...preState,
            username: res.username,
            id: res.patient_id,
            isAuthenticated: true,
          };
        });
        navigate("/dashboard");
      } else {
        console.log("Server Down");
        setModalDetails({
          isVisible: true,
          title: "Server Down! Please try again later",
          type: "error",
        });
      }
    } catch (error) {
      console.log("Server Error");
      setModalDetails({
        isVisible: true,
        title: "Server Down! Please try again later",
        type: "error",
      });
    }
  };
  const backHandler = () => {
    setDetailsValid(false);
  };
  return (
    <React.Fragment>
      {modalDetails.isVisible && modalDetails.type === "error" && (
        <ErrorModal title={modalDetails.title} closeModal={closeModal} />
      )}
      {!detailsValid && (
        <PersonalDetails
          loginDisplayHandler={props.loginDisplayHandler}
          personalDataHandler={personalDataHandler}
        />
      )}
      {detailsValid && (
        <RegistrationDetails
          personalDetailsBackHandler={backHandler}
          loginDataHandler={loginDataHandler}
        />
      )}
    </React.Fragment>
  );
};

export default RegisterForm;
