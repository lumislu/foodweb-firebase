import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <header className=" container-xl  ">
      <div
        className="row d-flex align-items-center "
        style={{
          backgroundImage: `url(images/cafe.jpg)`,
          height: "500px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        loading="lazy"
      >
        <div className="col-10 offset-1 offset-sm-1  col-sm-6 bg-light p-4 opacity-75 ">
          <h1 className="fw-bold text-body-emphasis">Find Your Dream Foods</h1>
          <p className="fs-6">
            Welcome to TastyVoyage - Where Your Flavor Journey Begins! Taste the
            World with Us."
          </p>

          <Link
            to={"/products"}
            type="button"
            className="btn btn-dark  rounded-0  fs-6"
          >
            Shop
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Hero;
