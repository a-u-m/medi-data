import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useActionData } from "react-router-dom";
import Navbar from "../components/Navbar";
import PhysicalsMain from "../components/Physicals/PhysicalsMain";

const PhysicalTraits = () => {
  return (
    <div className="w-full flex flex-col h-screen bg-[#ebebeb]">
      <Navbar />
      <PhysicalsMain />
    </div>
  );
};

export default PhysicalTraits;
