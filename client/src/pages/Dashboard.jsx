import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../components/contexts/LoginContext";
import ContainerA from "../components/UI/ContainerA";
import LoadingAnimation from "../components/UI/LoadingAnimation";
import axios from "axios";

const Dashboard = () => {
  const ctx = useContext(LoginContext);
  const [personalDetails, setPersonalDetails] = useState({
    isFetched: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (!ctx.loginDetails.isAuthenticated) return;
    localStorage.setItem("loginState", JSON.stringify(ctx.loginDetails));
  }, [ctx.loginDetails]);

  useEffect(() => {
    const ld = localStorage.getItem("loginState");
    if (ld === null) {
      setIsAuthenticated(false);
    } else {
      ctx.setLoginDetails(JSON.parse(ld));
      setIsAuthenticated(JSON.parse(ld).isAuthenticated);
    }
  }, []);

  useEffect(() => {
    const fetchPd = async () => {
      if (!ctx.loginDetails.isAuthenticated) return;
      try {
        const res = await axios.get(
          `http://localhost:3300/${ctx.loginDetails.id}/perdet`
        );
        setPersonalDetails((prevState) => {
          return { ...prevState, ...res.data[0], isFetched: true };
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPd();
  }, [ctx.loginDetails]);

  return (
    <React.Fragment>
      {isAuthenticated === false ? (
        <Navigate replace to="/login" />
      ) : (
        <>
          {personalDetails.isFetched ? (
            <ContainerA>
              <div className="flex flex-col">
                <div>
                  Welcome {personalDetails.firstname} {personalDetails.lastname}
                </div>
              </div>
            </ContainerA>
          ) : (
            <LoadingAnimation />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
