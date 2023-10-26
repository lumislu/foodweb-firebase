import React from "react";

const MyButton = ({ text, icon, handleFunc, others }) => {
  return (
    <button
      className={`btn  border-0 d-flex align-items-center    ${others} 
                }`}
      onClick={handleFunc}
    >
      <span className="fs-5 ">{icon}</span>
      <span className="pt-1 ">{text}</span>
    </button>
  );
};

export default MyButton;
