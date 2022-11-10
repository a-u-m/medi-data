import React, { useState, useEffect } from "react";
import ContainerA from "../components/UI/ContainerA";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import axios from "axios";

const Dashboard = (props) => {
  const [personalDetails, setPersonalDetails] = useState({});
  console.log(props);
  // useState(() => {
  //   const fetchPd = async () => {
  //     if (props) {
  //       // const res = await axios.get(
  //       //   `http://localhost:3300/${props.personalDetails.patient_id}/perdet`
  //       // );
  //       console.log(props);
  //     }
  //     console.log(props);
  //   };
  //   fetchPd();
  // });
  return (
    <ContainerA>
      <div>Welcome {props.basicDetails.username}</div>
    </ContainerA>
  );
};

export default Dashboard;
