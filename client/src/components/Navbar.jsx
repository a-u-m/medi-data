import React from "react";
import Logo from "./UI/Logo";
import { useNavigate, Navigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("loginState");
    navigate("/login", { replace: true });
  };
  return (
    <div className="w=full h-[4rem] flex flex-row justify-between bg-[white] shadow">
      <Logo
        onClick={() => {
          navigate("/dashboard", { replace: true });
        }}
      />
      <button
        className="border border-black p-1 rounded mt-2 mr-2 mb-2 pl-2 pr-2"
        onClick={logoutHandler}
      >
        logout
      </button>
    </div>
  );
};

export default Navbar;
