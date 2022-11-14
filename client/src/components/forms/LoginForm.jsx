import React, { useState, useContext, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";
import InputA from "../UI/InputA";
import ButtonA from "../UI/ButtonA";
import ContainerB from "../UI/ContainerB";
import HeadingA from "../UI/HeadingA";
import axios from "axios";
import ErrorModal from "../UI/ErrorModal";
import InvalidModal from "../UI/InvalidModal";
import Login from "../../pages/Login";

const LoginForm = (props) => {
  const ctx = useContext(LoginContext);
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [modalDetails, setModalDetails] = useState({
    isVisible: false,
    title: "",
    type: "",
  });
  useEffect(() => {
    const ld = localStorage.getItem("loginState");
    if (ld === null) {
      console.log("not signed in");
    } else {
      if (JSON.parse(ld).isAuthenticated) {
        ctx.setLoginDetails(JSON.parse(ld));
        navigate("/dashboard", { replace: true });
      } else {
        console.log("not signed in");
      }
    }
  }, []);

  const closeModal = () => {
    setModalDetails({ isVisible: false, title: "", type: "" });
  };
  const submitHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3300/login", {
        username: loginUsername,
        password: loginPassword,
      });
      if (!res.data.length) {
        console.log("--");
        setModalDetails({
          isVisible: true,
          title: "Invalid Inputs! Please enter correct details",
          type: "invalid",
        });
      } else {
        // props.loginDataHandler(res.data[0]);
        ctx.setLoginDetails((preState) => {
          return {
            ...preState,
            username: res.data[0].username,
            id: res.data[0].patient_id,
            isAuthenticated: true,
          };
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log("Server Error");
      setModalDetails({
        isVisible: true,
        title: "Server Error! Please try again later",
        type: "error",
      });
    }
  };
  const usernameHandler = (e) => {
    setLoginUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setLoginPassword(e.target.value);
  };
  return (
    <ContainerB className="w-[23rem] h-fit p-2">
      {modalDetails.isVisible && modalDetails.type === "error" && (
        <ErrorModal title={modalDetails.title} closeModal={closeModal} />
      )}
      {modalDetails.isVisible && modalDetails.type === "invalid" && (
        <InvalidModal title={modalDetails.title} closeModal={closeModal} />
      )}
      <HeadingA>Enter Your Login Details Below To See Your Reports !</HeadingA>
      <InputA
        placeholder="Enter username"
        type="text"
        className="w-full mb-1 mt-2"
        onChange={usernameHandler}
        value={loginUsername}
      />
      <InputA
        placeholder="Enter Password"
        type="password"
        className="w-full mb-2 mt-1"
        onChange={passwordHandler}
        value={loginPassword}
      />
      <ButtonA
        content="Login"
        className="w-full mb-1 mt-2 bg-[#1c1b1b]"
        onClick={submitHandler}
      />
      <div className="text-center w-full mt-1 ">---- or ----</div>
      <ButtonA
        content="Register !"
        className="w-full mb-1 mt-2 hover:bg-[#545454e5] bg-[#545454]"
        onClick={props.registerDisplayHandler}
      />
    </ContainerB>
  );
};

export default LoginForm;
