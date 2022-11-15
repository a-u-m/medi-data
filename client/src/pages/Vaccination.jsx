import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Vaccination = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    const ls = localStorage.getItem("loginState");
    if (ls === null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(JSON.parse(ls).isAuthenticated);
    }
  }, []);
  return (
    <>
      {!isAuthenticated ? (
        <Navigate replace to="/login" />
      ) : (
        <>
          <Navbar />
          
        </>
      )}
    </>
  );
};

export default Vaccination;
