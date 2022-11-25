import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../UI/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import overviewIcon from "../../assets/research.png";
import ErrorModal from "../UI/ErrorModal";
import UpdateVaccination from "./UpdateVaccination";
import VaccinationCard from "./VaccinationCard";

const VaccinationMain = (props) => {
  const navigate = useNavigate();
  const [modalDetails, setModalDetails] = useState({
    isVisible: false,
    title: "",
    type: "",
  });
  const [vaccinedata, setVaccinedata] = useState({ isFetched: false });
  const [loginDetails, setLoginDetails] = useState({});
  const [state, setState] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [vaccineUpdateView, setVaccineUpdateView] = useState(false);

  const closeModal = () => {
    setModalDetails({ isVisible: false, title: "", type: "" });
  };
  const updateVacHandler = () => {
    setVaccineUpdateView((prevState) => {
      return !prevState;
    });
  };
  const deleteHandler = async (vac_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3300/vaccination/${vac_id}`
      );
      setState((prevState) => {
        return !prevState;
      });
    } catch {
      setModalDetails({
        isVisible: true,
        title: "Server Error! Please try again later",
        type: "error",
      });
    }
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
    const fetchVaccineData = async () => {
      try {
        if (!Object.keys(loginDetails).length) return;
        const res = await axios.get(
          `http://localhost:3300/vaccination/${loginDetails.id}/`
        );
        setVaccinedata({ data: res.data, isFetched: true });
      } catch {
        setModalDetails({
          isVisible: true,
          title: "Server Error! Please try again later",
          type: "error",
        });
      }
    };
    fetchVaccineData();
  }, [loginDetails, vaccineUpdateView, state]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);

  if (vaccinedata.isFetched) {
    return (
      <>
        {vaccineUpdateView ? (
          <UpdateVaccination
            updateVacHandler={updateVacHandler}
            loginDetails={loginDetails}
          />
        ) : (
          <>
            {vaccinedata.data[0].length ? (
              <div className="flex-auto flex flex-col">
                <dir className=" mt-1 mb-1 text-[2rem]">Vaccination</dir>
                <div className="flex-1 flex flex-row justify-center  ml-[2%] mr-[2%]">
                  <div className="flex-auto w-[25%] h-fit flex flex-col">
                    <div className="flex-auto m-1 rounded bg-white shdaow p-1 text-center">
                      <label for="sort" className="font-[600]">
                        Sort By:
                      </label>

                      <select
                        name="sort"
                        className="text-center"
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      >
                        <option value="default">default</option>
                        <option value="date">Date</option>
                        <option value="vaccine">Vaccine name</option>
                      </select>
                    </div>

                    <div className="flex-auto m-1 rounded bg-white shdaow">
                      <div className="flex flex-row  p-2">
                        <img src={overviewIcon} width="24px" className="mr-1" />
                        Overview
                      </div>
                      <div className="p-2 font-[600]">
                        Vaccinations Undertaken:{" "}
                        {vaccinedata.data[1][0].totalVaccination}
                      </div>
                      <div className="p-2 font-[600]">
                        Net Vaccination Cost:{" "}
                        {vaccinedata.data[1][0].vacTotalCost}
                      </div>
                      <div className=" p-2 font-[600]"></div>
                    </div>
                  </div>
                  <div className="flex-auto w-[75%]">
                    <div className=" h-fit flex flex-row bg-[white] shadow rounded font-[600] m-1">
                      <div className=" flex-auto  rounded m-1 w-[20%] flex justify-center items-center">
                        VACCINE NAME
                      </div>
                      <div className="rounded flex-auto m-1 w-[20%] flex justify-center items-center">
                        DATE
                      </div>
                      <div className="rounded flex-auto m-1 w-[10%] flex justify-center items-center">
                        DOSE
                      </div>
                      <div className="rounded flex-auto m-1 w-[10%] flex justify-center items-center">
                        NET DOSES
                      </div>
                      <div className="rounded  flex-auto m-1 w-[20%] flex justify-center items-center">
                        TYPE
                      </div>
                      <div className="rounded flex-auto m-1 w-[10%] flex justify-center items-center">
                        FOR
                      </div>
                      <div className="rounded flex-auto m-1 w-[10%] flex justify-center items-center">
                        COST
                      </div>
                      <div className="rounded  flex-auto m-1 w-[5%] flex justify-center items-center"></div>
                    </div>
                    {vaccinedata.data[0].map((info) => {
                      return (
                        <VaccinationCard
                          info={info}
                          keys={info.vaccinedata}
                          deleteHandler={deleteHandler}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-auto flex justify-center items-center">
                {modalDetails.isVisible && modalDetails.type === "error" && (
                  <ErrorModal
                    title={modalDetails.title}
                    closeModal={closeModal}
                  />
                )}
                No Vaccination Details
              </div>
            )}
            <button
              className=" bg-[black] shadow-md p-5 m-10 rounded-full absolute bottom-0 right-0"
              onClick={updateVacHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
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

export default VaccinationMain;
