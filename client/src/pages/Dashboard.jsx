import React, { useEffect } from "react";
import ContainerA from "../components/UI/ContainerA";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

const Dashboard = (props) => {
  console.log(props.basicDetails);
  return (
    <ContainerA>
      <div>Welcome {props.basicDetails.username}</div>
    </ContainerA>
  );
};

export default Dashboard;
