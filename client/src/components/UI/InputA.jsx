import React from "react";

const InputA = (props) => {
  return (
    <React.Fragment>
      <input
        className={`p-3 h-[3rem] tracking-wider text-center placeholder-[#777777] focus:outline-[black] bg-[#ececec] rounded-lg ${props.className}`}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </React.Fragment>
  );
};

export default InputA;
