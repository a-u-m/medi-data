import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="h-screen absolute z-50 w-full flex flex-row justify-center items-center ">
      <div className="animate-spin h-5 w-5 mr-3 bg-[black]"></div>
      loading
    </div>
  );
};

export default LoadingAnimation;
