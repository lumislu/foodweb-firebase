import { Outlet } from "react-router-dom";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div
      className=" min-vh-100 container d-flex flex-column p-0 "
      style={{ maxWidth: "1600px" }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
