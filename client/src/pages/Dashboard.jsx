import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginContext from "../components/contexts/LoginContext";
import LoadingAnimation from "../components/UI/LoadingAnimation";
import CardA from "../components/UI/CardA";
import Navbar from "../components/Navbar";
import MyProfile from "../components/MyProfile";
import axios from "axios";
import DashAppointment from "../components/DashAppointment";
import DashCards from "../components/DashCards";
import UpdateProfile from "../components/UpdateProfile";

const Dashboard = () => {
  const ctx = useContext(LoginContext);
  const [profileView, setProfileView] = useState({
    isFetched: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [profileEdit, setProfileEdit] = useState(false);
  const profileUpdateHandler = () => {
    setProfileEdit((prevState) => {
      return !prevState;
    });
  };
  const [dates, setdates] = useState([]);
  const fetchdates = async () => {
    try {
      const temp = await axios.get("http://localhost:3300/dates");
      console.log(temp.data);
      setdates(temp.data);

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchdates();
  }, [])

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
          `http://localhost:3300/${ctx.loginDetails.id}/myprofile`
        );
        setProfileView((prevState) => {
          return { ...prevState, ...res.data[0], isFetched: true };
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPd();
  }, [ctx.loginDetails, profileEdit]);

  return (
    <React.Fragment>
      {isAuthenticated === false && dates.length != 0 ? (
        <Navigate replace to="/login" />
      ) : (
        <>
          {profileView.isFetched ? (
            <div className="w-full flex flex-col h-screen bg-[#ebebeb]">
              <Navbar />
              <div className="flex-1 flex flex-col-reverse md:flex-row">
                <div className="basis-2/3 grid grid-cols-2  lg:grid-cols-3  m-2 mr-0">
                  <DashCards dates={dates} />
                </div>
                <div className="basis-1/3 flex flex-col m-2 ml-0">
                  {profileEdit ? (
                    <UpdateProfile
                      profileView={profileView}
                      loginDetails={ctx.loginDetails}
                      profileUpdateHandler={profileUpdateHandler}
                    />
                  ) : (
                    <MyProfile
                      profileView={profileView}
                      loginDetails={ctx.loginDetails}
                      profileUpdateHandler={profileUpdateHandler}
                    />
                  )}
                  <DashAppointment />
                </div>
              </div>
            </div>
          ) : (
            <LoadingAnimation />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
