import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import { HiOutlineBars3} from "react-icons/hi2";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useAuth } from "../hook/useAuth";
import { useProductContext } from "../context/productContext";
import Search from "./Search";

const Navbar = () => {
  const {  cartItems} = useProductContext();
  const { user, alreadyLogin } = useAuthContext();
  const { logOut } = useAuth();

  const [openNavbar, setOpenNavbar] = useState(false);

  useEffect(() => {}, [user, alreadyLogin]);

  const navbarToggle = () => {
    setOpenNavbar(!openNavbar);
  };

  const links = [
    {
      link: "Home",
      href: "/",
    },
    {
      link: "Product",
      href: "/products",
    },
    {
      link: "About",
      href: "/about",
    },
    { link: "Contact", href: "/contact" },
  ];

  return (
    <header
      className="p-2 "
      style={{
        backgroundColor: "#bccbba",
      }}
    >
      <div className=" container-lg  ">
        <div className="d-flex flex-nowrap align-items-center  justify-content-between  position-relative    ">
          <div className="d-flex gap-4">
            {/* logo */}
            <div>
              <Link to="/" className="navlink fw-bold  logo d-none d-sm-flex ">
                TastyVoyage.
              </Link>
              <Link
                to="/"
                className="navlink fw-bold   logo fw-bolder d-sm-none  "
              >
                Tasty.
              </Link>
            </div>
            {/* navlinks */}
            <div className="d-none d-md-flex align-items-center justify-content-center gap-lg-4    ">
              {links.map((item) => (
                <NavLink
                  to={item.href}
                  key={item.link}
                  className={({ isActive }) =>
                    `font-sm navlink fw-semibold ${
                      isActive ? "text-color" : "text-gray "
                    }`
                  }
                >
                  {item.link}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="d-flex align-items-baseline   justify-content-center gap-2  ">
            {/* search btn */}
            <Search />

            {user ? (
              <span className="d-none d-sm-flex font-sm">
                <Link
                  to={"/profile"}
                  className="d-none d-sm-flex font-sm link-body-emphasis  link-offset-2 link-underline-opacity-0  link-underline-opacity-100-hover "
                >
                  Hi,{user.displayName}
                </Link>
              </span>
            ) : (
              <Link
                to="/login"
                type="btn"
                className="navlink text-color d-none d-md-block fs-5"
              >
                <AiOutlineUser />
              </Link>
            )}

            <Link
              to={"/mycart"}
              type="button"
              className="navlink  text-color position-relative"
              onClick={() => setOpenNavbar(false)}
            >
              <span className="fs-5">
                <AiOutlineShopping />
              </span>

              {cartItems.length > 0 && (
                <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-primary">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* navbarbtn */}
            <button
              className=" btn btn-outline-dark border-0 bg-transparent  text-color fs-5 d-md-none"
              onClick={navbarToggle}
            >
              <HiOutlineBars3 />
            </button>
          </div>
        </div>
        {/* navbarbtn  lists*/}
        {openNavbar && (
          <div
            className=" position-absolute start-0  w-100  d-flex d-md-none  flex-column   justify-content-center  text-center bg-light   mt-3  py-3 z-2  "
            onMouseEnter={() => setOpenNavbar(true)}
            onMouseLeave={() => setOpenNavbar(false)}
          >
            <div className="d-flex flex-column  ">
              <span className="font-sm">Hi,{user.displayName}</span>
              <Link
                to={"/profile"}
                className="btn btn-light  py-2 text-color font-sm"
                onClick={() => setOpenNavbar(false)}
              >
                Account Settings
              </Link>
              <hr />
              {links.map((item, index) => (
                <Link
                  to={item.href}
                  key={index}
                  className="btn btn-light  text-color font-sm   "
                  onClick={() => setOpenNavbar(false)}
                >
                  {item.link}
                </Link>
              ))}
            </div>
            <hr />
            <div className="d-flex flex-column   ">
              {!alreadyLogin ? (
                <Link
                  to="/login"
                  className="btn btn-light  py-2 text-color font-sm "
                  onClick={() => setOpenNavbar(false)}
                >
                  Login in
                </Link>
              ) : (
                <Link
                  className="btn btn-light  py-2 text-color font-sm "
                  onClick={() => {
                    setOpenNavbar(false);
                    logOut();
                  }}
                >
                  Login out
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
