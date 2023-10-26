import React from "react";
import { GrFormSubtract, GrAdd } from "react-icons/gr";

const QuantitySelector = ({
  quantity,
  handleDecrement,
  handleIncrement,
  handleInputChange,
}) => {
  return (
    <div className="d-flex align-items-center justify-content-center   gap-1 ">
      <button
        className={`btn pb-2 btn-outline-light border-1 ${
          quantity === 0 ? "bg-secondary-subtle" : ""
        }`}
        onClick={handleDecrement}
      >
        <GrFormSubtract />
      </button>
      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        className="rounded-2 text-center border-0 bg-light "
        style={{ width: "3rem", height: "3rem" }}
      />
      <button
        className="btn pb-2 btn-outline-light border-1  "
        onClick={handleIncrement}
      >
        <GrAdd />
      </button>
    </div>
  );
};

export default QuantitySelector;
