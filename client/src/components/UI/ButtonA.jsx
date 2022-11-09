import React from "react";

const ButtonA = (props) => {
  return (
    <React.Fragment>
      <button
        className={`p-3 h-[3rem] tracking-wider text-center text-[white] hover:bg-[#1c1b1be9] rounded-lg ${props.className}`}
        onClick={props.onClick}
      >
        {props.content}
      </button>
    </React.Fragment>
  );
};

export default ButtonA;
