import React, { useState, useEffect } from "react";
import ContainerA from "../components/UI/ContainerA";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import axios from "axios";

const Dashboard = (props) => {
  const [personalDetails, setPersonalDetails] = useState({});
  console.log(`http://localhost:3300/${props.basicDetails.patient_id}/perdet`);
  useEffect(() => {
    const fetchPd = async () => {
      const res = await axios.get(
        `http://localhost:3300/${props.basicDetails.patient_id}/perdet`
      );
      setPersonalDetails(res.data[0]);
    };
    fetchPd();
  }, []);
  return (
    <ContainerA>
      <div>Welcome {props.basicDetails.username}</div>
    </ContainerA>
  );
};

export default Dashboard;
