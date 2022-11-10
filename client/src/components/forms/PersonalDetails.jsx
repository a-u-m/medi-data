import React, { useState } from "react";
import InputA from "../UI/InputA";
import ContainerB from "../UI/ContainerB";
import HeadingA from "../UI/HeadingA";
import ButtonA from "../UI/ButtonA";
import validator from "validator";
import InvalidModal from "../UI/InvalidModal";

const PersonalDetails = (props) => {
  const [emailIsValid, setEmailIsValid] = useState("");
  const [ageIsValid, setAgeIsValid] = useState("");
  const [contactIsValid, setContactIsValid] = useState("");
  const [firtnameIsValid, setFirstnameIsValid] = useState("");
  const [lastnameIsValid, setLastnameIsValid] = useState("");
  const [modalDetails, setModalDetails] = useState({
    isVisible: false,
    title: "",
    type: "",
  });
  const closeModal = () => {
    setModalDetails({ isVisible: false, title: "", type: "" });
  };
  // const [formIsValid, setFormIsValid] = useState(true);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    contact: "",
    email: "",
  });
  const submitHandler = () => {
    if (
      ageIsValid &&
      emailIsValid &&
      contactIsValid &&
      firtnameIsValid &&
      lastnameIsValid
    ) {
      console.log("Validating..");
      props.personalDataHandler(data);
    } else {
      console.log("Inputs are not as per our standards");
      setModalDetails({
        isVisible: true,
        title: "Invalid Inputs! Please enter valid details",
        type: "invalid",
      });
    }
  };
  const ageHandler = (e) => {
    if (e.target.value < 1 && !validator.isEmpty(e.target.value)) {
      setAgeIsValid(false);
    } else {
      setAgeIsValid(true);
      setData((preState) => {
        return { ...preState, age: e.target.value };
      });
    }
  };
  const mailHandler = (e) => {
    if (
      validator.isEmail(e.target.value) &&
      !validator.isEmpty(e.target.value)
    ) {
      setEmailIsValid(true);
      setData((preState) => {
        return { ...preState, email: e.target.value };
      });
    } else {
      setEmailIsValid(false);
    }
  };
  const contactHandler = (e) => {
    if (
      validator.isMobilePhone(e.target.value, "en-IN") &&
      !validator.isEmpty(e.target.value)
    ) {
      setContactIsValid(true);
      setData((preState) => {
        return { ...preState, contact: e.target.value };
      });
    } else {
      setContactIsValid(false);
    }
  };
  const firstNameHandler = (e) => {
    if (
      validator.isAlpha(e.target.value) &&
      !validator.isEmpty(e.target.value)
    ) {
      setFirstnameIsValid(true);
      setData((preState) => {
        return { ...preState, firstName: e.target.value };
      });
    } else {
      setFirstnameIsValid(false);
      console.log("Firstname does not meet correct standards");
    }
  };
  const lastNameHandler = (e) => {
    if (
      validator.isAlphanumeric(e.target.value) &&
      !validator.isEmpty(e.target.value)
    ) {
      setLastnameIsValid(true);
      setData((preState) => {
        return { ...preState, lastName: e.target.value };
      });
    } else {
      setLastnameIsValid(false);
      console.log("LastName does not meet correct standards");
    }
  };
  return (
    <ContainerB className="w-[23rem] h-fit p-2">
      {modalDetails.isVisible && modalDetails.type === "invalid" && (
        <InvalidModal title={modalDetails.title} closeModal={closeModal} />
      )}
      <HeadingA>Fill In The Details To Create A New Account !</HeadingA>
      <div className="flex w-full">
        <InputA
          placeholder="First Name"
          type="text"
          className={`w-1/2 mr-1 mb-1 mt-2 `}
          onChange={firstNameHandler}
        />
        <InputA
          placeholder="Last Name"
          type="text"
          className={`w-1/2 mr-1 mb-1 mt-2`}
          onChange={lastNameHandler}
        />
      </div>
      <div className="flex w-full">
        <InputA
          placeholder="age"
          type="number"
          className={`w-1/4 mr-1 mb-1 mt-2 ${
            ageIsValid || ageIsValid === "" ? "" : "outline "
          }`}
          onChange={ageHandler}
        />
        <InputA
          placeholder="Contact"
          type="tel"
          className={`w-3/4 ml-1 mb-1 mt-2 ${
            contactIsValid || contactIsValid === "" ? "" : "outline"
          }`}
          onChange={contactHandler}
        />
      </div>

      <InputA
        placeholder="Email Id"
        type="email"
        className={`w-full mb-2 mt-1 ${
          emailIsValid || emailIsValid === "" ? "" : "outline"
        }`}
        onChange={mailHandler}
      />
      <ButtonA
        content="Continue"
        className="w-full mb-1 mt-2 bg-[#1c1b1b]"
        onClick={submitHandler}
      />
      <div className="text-center w-full mt-1 ">---- or ----</div>
      <ButtonA
        content="Login !"
        className="w-full mb-1 mt-2 hover:bg-[#545454e5] bg-[#545454]"
        onClick={props.loginDisplayHandler}
      />
    </ContainerB>
  );
};

export default PersonalDetails;
