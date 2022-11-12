import React, { useState, useEffect } from "react";

const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
  const [loginDetails, setLoginDetails] = useState({
    id: "",
    username: "",
    isAuthenticated: false,
  });
  // useEffect(() => {
  //   if (!loginDetails.isAuthenticated) return;
  //   localStorage.setItem("loginState", JSON.stringify(loginDetails));
  // }, [loginDetails]);
  return (
    <LoginContext.Provider value={{ loginDetails, setLoginDetails }}>
      {children}
    </LoginContext.Provider>
  );
};
export default LoginContext;
export { LoginProvider };
