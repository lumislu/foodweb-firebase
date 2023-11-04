import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineContainer,
  AiOutlineLogout,
} from "react-icons/ai";
import Userform from "../components/Userform";
import { Card, Order } from "../components";
import { useProductContext } from "../context/productContext";
import { useAuthContext } from "../context/authContext";
import { useAuth } from "../hook/useAuth";

const Profile = () => {
  const { favoriteItems } = useProductContext();
  const { logOut, getUserOderData, Loading, setLoading } = useAuth();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const userFormRef = useRef();
  const wishListRef = useRef();
  const myOrdersRef = useRef();

  const profileLinks = [
    {
      icon: <AiOutlineUser />,
      link: "Profile Info",
      href: "/profile",
      id: userFormRef,
    },
    {
      icon: <AiOutlineShopping />,
      link: "Shipping Bag",
      href: "/mycart",
      id: "ShippingBag",
    },
    {
      icon: <AiOutlineHeart />,
      link: "Wish List",
      href: "/profile",
      id: wishListRef,
    },
    {
      icon: <AiOutlineContainer />,
      link: "My Orders",
      href: "/profile",
      id: myOrdersRef,
    },
  ];

  const [orderdata, setOrderData] = useState([]);

  const fetchData = async () => {
    if (user) {
      const orderdata = await getUserOderData();
      setOrderData(orderdata);
      setLoading(false);
    }
  };
  const [isfilter, setIsFilter] = useState("最舊");
  const filterBtns = ["最新", "最舊"];
  const [isOpen, setIsOpen] = useState([]);

  const toggleOrder = (id) => {
    setIsOpen((prev) => ({ [id]: !prev[id] }));
  };

  const handlefilterBtns = (isfilter) => {
    setIsFilter(isfilter);

    const filterorder = [...orderdata];

    switch (isfilter) {
      case "最新":
        filterorder.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case "最舊":
        filterorder.sort((a, b) => a.timestamp - b.timestamp);
        break;
      default:
        break;
    }

    setOrderData(filterorder);
  };
  const userLogout = () => {
    logOut();
    navigate("/");
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [user]);

  const scrollToTarget = (targetRef) => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container  my-5 flex-grow-1  ">
      <header className="row">
        <h1 className="col fs-3 border-2 border-bottom border-light p-4 m-0">
          {user && (
            <span className=" text-uppercase ">Hi !{user.displayName}</span>
          )}
        </h1>
      </header>
      {/* 主要內容 */}
      <div className="row ">
        {/* 側邊導覽列  */}
        <nav className="d-none col-md-2 d-md-flex flex-column  px-0 border-2 border-end border-light ms-4 ">
          <h6 className="pt-5 fw-semibold ">User Profile</h6>
          {profileLinks.map((item, index) => (
            <Link
              to={item.href}
              key={index}
              className="icon-link nav-link p-2"
              onClick={() => scrollToTarget(item.id)}
            >
              <span className="pb-1 fs-6">{item.icon}</span>
              <span className="font-sm ">{item.link}</span>
            </Link>
          ))}
          {/* 登出 */}
          <button className="icon-link  nav-link p-2 mt-5" onClick={userLogout}>
            <span className="pb-1 fs-6">
              <AiOutlineLogout />
            </span>
            <span className="font-sm ">Log out</span>
          </button>
        </nav>
        <section className="col-12 col-md-9 ms-auto mt-5 d-flex flex-column gap-5 text-center text-md-start p-0">
          {/* 個人資料編輯 */}
          <div id="userFormRef" ref={userFormRef}>
            <Userform />
          </div>
          {/* 收藏清單*/}
          <div id="wishListRef" ref={wishListRef}>
            <h6 className="fw-semibold">Wish List</h6>
            {favoriteItems.length !== 0 ? (
              <div className="row row-cols-2  row-cols-lg-4 gy-2 ">
                {favoriteItems.map((item) => (
                  <Card item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className="font-sm">尚無添加收藏</div>
            )}
          </div>
          {/* 歷史訂單 */}
          {!Loading ? (
            <div id="myOrdersRef" ref={myOrdersRef}>
              <h6>My Orders</h6>
              {/* 訂單排序 */}
              <div className="col">
                {filterBtns.map((type, index) => (
                  <button
                    key={index}
                    className={`btn rounded-5 btn-light  font-sm m-1 ${
                      isfilter === type
                        ? "text-black border border-1 border-secondary"
                        : "text-gray "
                    }`}
                    onClick={() => handlefilterBtns(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {orderdata && orderdata.length !== 0 ? (
                <div className="d-flex flex-wrap justify-content-center  gap-2  w-100   ">
                  {orderdata.map((order, index) => (
                    <div
                      key={order.docId}
                      onClick={() => toggleOrder(order.docId)}
                    >
                      <Order order={order} />
                      {isOpen[order.docId] && (
                        <Order
                          order={order}
                          isOpen={isOpen[order.docId]}
                          id={order.docId}
                          setIsOpen={() => toggleOrder(order.docId)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="font-sm">尚無訂單</div>
              )}
            </div>
          ) : (
            <div>載入中</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
