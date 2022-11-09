import React, { useState } from "react";
import ContainerA from "../components/UI/ContainerA";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

const Login = (props) => {
  const [loginState, setLoginState] = useState(true);

  const registerHandler = () => {
    setLoginState(false);
  };
  const loginHandler = () => {
    setLoginState(true);
  };
  return (
    <ContainerA>
      {loginState && (
        <LoginForm
          registerHandler={registerHandler}
          pageDashHandler={props.pageDashHandler}
        />
      )}
      {!loginState && (
        <RegisterForm
          loginHandler={loginHandler}
          pageDashHandler={props.pageDashHandler}
        />
      )}
    </ContainerA>
  );
};

export default Login;
