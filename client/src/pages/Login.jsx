import React, { useState } from "react";
import ContainerA from "../components/UI/ContainerA";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

const Login = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const registerDisplayHandler = () => {
    setIsLogin(false);
  };
  const loginDisplayHandler = () => {
    setIsLogin(true);
  };
  return (
    <ContainerA>
      {isLogin && (
        <LoginForm
          registerDisplayHandler={registerDisplayHandler}
          loginDataHandler={props.loginDataHandler}
        />
      )}
      {!isLogin && (
        <RegisterForm
          loginDisplayHandler={loginDisplayHandler}
          loginDataHandler={props.loginDataHandler}
        />
      )}
    </ContainerA>
  );
};

export default Login;
