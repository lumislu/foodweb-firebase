import React from "react";
import { Link } from "react-router-dom";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";

const Contact = () => {
  const restaurantContactInfo = {
    name: "TastyVoyage",
    address: "street, taipei, Taiwan",
    phone: "+886 (09) 456-7890",
    email: "tastyvoyage@example.com",
    website: "www.tastyvoyage.com",
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 10:00 PM",
      saturday: "10:00 AM - 10:00 PM",
      sunday: "10:00 AM - 9:00 PM",
    },
    socialMedia: {
      facebook: "facebook.com/TastyVoyage",
      twitter: "twitter.com/TastyVoyage",
      instagram: "instagram.com/TastyVoyage",
    },
  };

  return (
    <div className="container flex-grow-1 d-flex flex-column justify-content-center gap-3">
      <h1 className=" fw-bold">Contact Us</h1>
      <div className="d-flex flex-column  flex-sm-row  justify-content-center gap-5 p-3 p-sm-0">
        <form className=" p-5  rounded-3 bg-light w-sm-75 ">
          <h2 className="fs-4">訂閱最新資訊</h2>
          <p className="font-sm">訂閱以獲得最新資訊和更新！</p>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" />
            <label>Email address</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" /> 同意訂閱
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            訂閱
          </button>
        </form>
        <div className="d-flex flex-column  justify-content-center align-items-center  align-items-sm-start   gap-2 ">
          <h1 className="fs-5 fw-bold  mb-3">{restaurantContactInfo.name}</h1>
          <h6> {restaurantContactInfo.address}</h6>
          <h6>{restaurantContactInfo.phone}</h6>
          <h6>{restaurantContactInfo.email}</h6>
          <a
            href={`http://${restaurantContactInfo.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {restaurantContactInfo.website}
          </a>
          <div className="d-flex  align-items-center  justify-content-start  gap-3  fs-3">
            <Link to="#" className="text-info fs-4">
              <BsTwitter />
            </Link>
            <Link to="#" className=" text-primary   fs-4">
              <BsFacebook />
            </Link>
            <Link to="#" className="text-danger opacity-75   fs-4">
              <BsInstagram />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
