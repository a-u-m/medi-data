import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./index.css";

const App = () => {
  const [dashDisplay, setDashDisplay] = useState(false);
  const [verifiedLoginDetails, setVerfiedLoginDetails] = useState({});

  useEffect(() => {
    if (
      Object.keys(verifiedLoginDetails).length === 0 &&
      verifiedLoginDetails.constructor === Object
    ) {
      console.log("no data");
      setDashDisplay(false);
    } else {
      console.log("data");
      setDashDisplay(true);
    }
  }, [verifiedLoginDetails]);

  const loginDataHandler = (loginDetails) => {
    setVerfiedLoginDetails(loginDetails);
  };

  return (
    <React.Fragment>
      {!dashDisplay && <Login loginDataHandler={loginDataHandler} />}
      {dashDisplay && <Dashboard basicDetails={verifiedLoginDetails} />}
      <div></div>
    </React.Fragment>
  );
};

export default App;
