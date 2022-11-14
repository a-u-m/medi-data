import React from "react";

const CardA = (props) => {
  return (
    <div
      className={`m-1 rounded bg-[#ffffff] shadow ${props.style}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default CardA;
