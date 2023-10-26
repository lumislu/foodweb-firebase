import React from "react";

const Message = ({ backgroundColorClass, addmsg, icon }) => {
  return (
    <div
      className={`position-absolute top-50 start-50 btn translate-middle d-flex align-items-center  gap-2 text-light  ${backgroundColorClass}`}
    >
      <span className="fs-6"> {icon}</span>
      <span className="font-sm"> {addmsg}</span>
    </div>
  );
};

export default Message;
