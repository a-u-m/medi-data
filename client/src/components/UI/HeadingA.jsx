import React from "react";

const HeadingA = (props) => {
  return (
    <React.Fragment>
      <div className={`w-full text-[1.5rem] ${props.className}`}>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default HeadingA;
