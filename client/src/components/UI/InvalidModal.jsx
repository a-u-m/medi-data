import React from "react";
import ReactDOM from "react-dom";

const InvalidModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <>
          <div className="absolute p-2 shadow flex flex-row bottom-[1rem] justify-between items-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 top w-[28rem] h-fit rounded-lg bg-[#f5f5f5]">
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
                stroke="orange"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              <div className="text- ml-2">{props.title}</div>
            </div>
            <div onClick={props.closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="black"
                className="w-6 h-6 hover:stroke-[red] hover:stroke-[1.5px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </>,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default InvalidModal;
