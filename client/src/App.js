import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./index.css";

const App = () => {
  const [dashDisplay, setDashDisplay] = useState(false);
  const [verifiedLoginDetails, setVerfiedLoginDetails] = useState({});

  const pageDashHandler = (loginDetails) => {
    setDashDisplay(true);
    setVerfiedLoginDetails(loginDetails);
  };

  return (
    <React.Fragment>
      {!dashDisplay && <Login pageDashHandler={pageDashHandler} />}
      {dashDisplay && <Dashboard basicDetails={verifiedLoginDetails} />}
      <div></div>
    </React.Fragment>
  );
};

export default App;
