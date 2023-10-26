import React from "react";
import { Product } from "../components";

const Products = () => {

  return (
    <div className="text-center p-lg-5 flex-grow-1  ">
      <div
        className=" opacity-75 d-flex align-items-center  justify-content-center  "
        style={{
          height: "25vh",
        }}
      >
        <h1 className=" text-black fw-bold  ">Shop Page</h1>
      </div>

      <Product />
    </div>
  );
};

export default Products;
