import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../UI/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import overviewIcon from "../../assets/research.png";
import ErrorModal from "../UI/ErrorModal";

const PhysicalsMain = (props) => {
  const navigate = useNavigate();
  const [modalDetails, setModalDetails] = useState({
    isVisible: false,
    title: "",
    type: "",
  });
  const [physicalData, setPhysicalData] = useState({ isFetched: false });
  const [loginDetails, setLoginDetails] = useState({});
  const [state, setState] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const closeModal = () => {
    setModalDetails({ isVisible: false, title: "", type: "" });
  };

  useEffect(() => {
    const ls = localStorage.getItem("loginState");
    if (ls === null) {
      setLoginDetails({ isAuthenticated: false });
      setIsAuthenticated(false);
    } else {
      setLoginDetails(JSON.parse(ls));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchPhysicalData = async () => {
      try {
        if (!Object.keys(loginDetails).length) return;
        const res = await axios.get(
          `http://localhost:3300/physical/${loginDetails.id}`
        );
        console.log(res.data);
        setPhysicalData({ data: res.data, isFetched: true });
      } catch {
        setModalDetails({
          isVisible: true,
          title: "Server Error! Please try again later",
          type: "error",
        });
      }
    };
    fetchPhysicalData();
  }, [loginDetails, state]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);

  if (physicalData.isFetched) {
    return (
      <>
        <div className="text-[2em] pl-4">Physical Traits</div>
        {/* <div className="border border-black flex-1 flex flex-row items-center justify-center p-1 flex-wrap">
          <div className="border border-black w-[18em] h-[18rem] m-2"></div>
          <div className="border border-black w-[18em] h-[18rem] m-2"></div>
          <div className="border border-black w-[18em] h-[18rem] m-2"></div>
          <div className="border border-black w-[18em] h-[18rem] m-2"></div>
        </div> */}
      </>
    );
  } else {
    return (
      <>
        {modalDetails.isVisible && modalDetails.type === "error" && (
          <ErrorModal title={modalDetails.title} closeModal={closeModal} />
        )}
        <LoadingAnimation />
      </>
    );
  }
};

export default PhysicalsMain;
