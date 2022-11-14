import React from "react";

const Logo = (props) => {
  return (
    <div
      className="flex items-center justify-center pr-2 pl-2 font-Michroma text-[1.5rem] font-[900] cursor-pointer"
      onClick={props.onClick}
    >
      Medi-Safe
    </div>
  );
};

export default Logo;
