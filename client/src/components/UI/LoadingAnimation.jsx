import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="h-screen w-full flex flex-row justify-center items-center ">
      <div className="animate-spin h-5 w-5 mr-3 rounded-full border-[2px] border-black border-b-0 bg-[#ffffff]"></div>
      loading
    </div>
  );
};

export default LoadingAnimation;
