import React, { useState, useRef } from "react";
import InputA from "../UI/InputA";
import ButtonA from "../UI/ButtonA";
import ContainerB from "../UI/ContainerB";
import HeadingA from "../UI/HeadingA";
import axios from "axios";

const LoginForm = (props) => {
  const [loginUsername, setLoginUsername] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const submitHandler = async () => {
    console.log(loginUsername);
    console.log(loginPassword);
    const res = await axios.post("http://localhost:3300/login", {
      username: loginUsername,
      password: loginPassword,
    });
    if (!res.data.length) {
      console.log("Not Registered");
    } else {
      props.pageDashHandler(res.data[0]);
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
        content="Continue"
        className="w-full mb-1 mt-2 bg-[#1c1b1b]"
        onClick={submitHandler}
      />
      <div className="text-center w-full mt-1 ">---- or ----</div>
      <ButtonA
        content="Register !"
        className="w-full mb-1 mt-2 hover:bg-[#545454e5] bg-[#545454]"
        onClick={props.registerHandler}
      />
    </ContainerB>
  );
};

export default LoginForm;
