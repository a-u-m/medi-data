import React from "react";

const ContainerA = (props) => {
  return (
    <React.Fragment>
      <div
        className={`flex w-full h-screen justify-center items-center  ${props.className}`}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default ContainerA;
