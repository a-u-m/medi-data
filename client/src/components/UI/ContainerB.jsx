import React from "react";

const ContainerB = (props) => {
  return (
    <React.Fragment>
      <div
        className={
          "flex flex-col justify-center items-center " + props.className
        }
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default ContainerB;
