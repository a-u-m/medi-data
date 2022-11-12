import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="h-screen w-full flex flex-row justify-center items-center ">
      <svg
        className="animate-spin h-5 w-5 mr-3 bg-[#000000]"
        viewBox="0 0 24 24"
      ></svg>
      loading
    </div>
  );
};

export default LoadingAnimation;
