import React from "react";

const PersentCircle = ({ rating, size, strokeWidth, font }) => {
  const core = rating * 20;
  const radius = size / 2 - 5;
  const circumference = radius * 2 * Math.PI; // 圓周長
  const argLength = circumference * (core / 100); // 弧長

  return (
    <div className=" position-relative ">
      <svg
        width={`${size}px`}
        height={`${size}px`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="#fff"
          stroke="#dbd8d8"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="#ffffff00"
          stroke="#f4cc1a"
          strokeWidth={strokeWidth}
          strokeDasharray={`${argLength} 99999`}
        />
      </svg>
      <span
        className={` position-absolute  top-50  start-50  translate-middle   fw-bold ${font}  `}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default PersentCircle;
