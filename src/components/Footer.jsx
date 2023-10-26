import React from "react";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    {
      link: "#",
      icon: <BsTwitter />,
    },
    {
      link: "#",
      icon: <BsFacebook />,
    },
    {
      link: "#",
      icon: <BsInstagram />,
    },
  ];

  return (
    <div
      className="d-flex flex-wrap justify-content-between align-items-center px-4 bgc-main "
      style={{ height: "4rem" }}
    >
      <span className="text-gray fw-medium font-sm ">
        &copy;copyright 2023 LumisLu
      </span>
      <div className="d-flex gap-1 ">
        {socialLinks.map((social, index) => (
          <Link to={social.link} key={index} className="text-gray navlink ">
            <span>{social.icon}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
