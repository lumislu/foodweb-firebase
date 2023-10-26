import { Outlet } from "react-router-dom";

import React from "react";
import HeaderNav from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div
      className=" min-vh-100 container d-flex flex-column p-0 "
      style={{ maxWidth: "1600px" }}
    >
      <HeaderNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
