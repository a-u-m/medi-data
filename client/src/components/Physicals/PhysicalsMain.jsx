import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../UI/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import overviewIcon from "../../assets/research.png";
import ErrorModal from "../UI/ErrorModal";
import PhysicalDisplay from "./PhysicalDisplay";
import PhysicalAdd from "./PhysicalAdd";
import PhysicalUpdate from "./PhysicalUpdate";

const PhysicalsMain = (props) => {
  const navigate = useNavigate();
  const [frame, setFrame] = useState(0);
  const [frame2, setFrame2] = useState(true);
  const sFrameHandler = () => {
    setFrame2((prevState) => {
      return !prevState;
    });
  };
  const fFrameHandler = () => {
    setFrame((prevState) => {
      return !prevState;
    });
  };
  const [modalDetails, setModalDetails] = useState({
    isVisible: false,
    title: "",
    type: "",
  });
  const [physicalData, setPhysicalData] = useState({
    data: {},
    isFetched: false,
  });
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
        let res = await axios.get(
          `http://localhost:3300/physical/${loginDetails.id}`
        );
        if (res.data[0] === undefined || res.data[0] === null) {
          setPhysicalData({ data: {}, isFetched: true });
        } else {
          setPhysicalData({ data: res.data[0], isFetched: true });
        }
      } catch {
        setModalDetails({
          isVisible: true,
          title: "Server Error! Please try again later",
          type: "error",
        });
      }
    };
    fetchPhysicalData();
  }, [loginDetails, state, frame2, frame]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);

  if (physicalData.isFetched && Object.keys(physicalData.data).length) {
    return (
      <>
        <div className="text-[2em] pl-4">Physical Traits</div>
        <div className=" flex-1 flex flex-row items-center justify-center p-1 flex-wrap bg-">
          {frame2 ? (
            <PhysicalDisplay
              existingData={physicalData.data}
              sFrameHandler={sFrameHandler}
            />
          ) : (
            <PhysicalUpdate
              existingData={physicalData.data}
              sFrameHandler={sFrameHandler}
            />
          )}
        </div>
      </>
    );
  } else if (
    physicalData.isFetched &&
    Object.keys(physicalData.data).length === 0
  ) {
    return (
      <>
        {frame ? (
          <>
            {" "}
            <div className="text-[2em] pl-4">Physical Traits</div>
            <div className="flex-1 flex flex-row items-center justify-center p-1 flex-wrap bg-">
              <PhysicalAdd
                existingData={physicalData.data}
                fFrameHandler={fFrameHandler}
              />{" "}
            </div>
            <button
              className=" absolute bottom-0 left-[0] m-2 p-2 px-4 rounded bg-[#dfdcdc] text-[#000000]"
              onClick={() => {
                setFrame(0);
              }}
            >
              Go Back
            </button>
          </>
        ) : (
          <>
            <div className="flex-auto flex justify-center items-center">
              {modalDetails.isVisible && modalDetails.type === "error" && (
                <ErrorModal
                  title={modalDetails.title}
                  closeModal={closeModal}
                />
              )}
              No Details
            </div>
            <button
              className=" absolute bottom-0 right-0 m-2 p-2 px-4 rounded bg-[black] text-[white]"
              onClick={() => {
                setFrame(1);
              }}
            >
              Add Data
            </button>
          </>
        )}
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
