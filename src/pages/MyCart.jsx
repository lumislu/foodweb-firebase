import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useProductContext } from "../context/productContext";
import { RiOpenArmLine, RiCheckboxBlankCircleFill } from "react-icons/ri";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import Payment from "../components/Payment";
import PaymentDetail from "../components/PaymentDetail";

const MyCart = () => {
  const { userData } = useAuthContext();
  const { cartItems, totalPrice, calculateTotalPrice } = useProductContext();
  const [mergedCartItems, setMergedCartItems] = useState([]);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
  });


  const toggleStep = (step) => {
    switch (step) {
      case "step1":
        setSteps({ ...steps, step1: true, step2: false });
        break;
      case "step2":
        setSteps({ ...steps, step1: false, step2: true, step3: false });
        break;
      case "step3":
        setSteps({ ...steps, step2: false, step3: true });
        break;
      default:
        break;
    }
  };



  const mergeItem = () => {
    const updatedCartItems = [];

    cartItems.forEach((item) => {
      const existingItem = updatedCartItems.find(
        (mergedItem) => mergedItem.category === item.category
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        updatedCartItems.push({
          category: item.category,
          quantity: item.quantity,
        });
      }
    });

    setMergedCartItems(updatedCartItems);
  };

  useEffect(() => {
    calculateTotalPrice();
    mergeItem();
  }, [totalPrice, cartItems]);

  return (
    <main className="container my-5 flex-grow-1 font-sm ">
      <section
        className=" border-2  border-secondary  p-0 "
        style={{ borderLeft: "dashed" }}
      >
        <header className=" btn border-0 position-relative">
          <div
            className=" position-absolute d-flex align-items-center gap-2 "
            style={{ left: "-9px", top: "-12px" }}
          >
            <span className="pb-1 ">
              <RiCheckboxBlankCircleFill />
            </span>
            <span className="ps-1 fw-semibold ">Step 01</span>
          </div>
          <h4 className="fw-bold p-3 m-0">Shopping Bag.</h4>
        </header>
        {steps.step1 && (
          <div className="row justify-content-center m-0 ">
            {/* 購物車區塊 */}
            <div className="col-lg-8 ">
              {cartItems.length !== 0 ? (
                <Cart />
              ) : (
                <div className="d-flex flex-column align-items-center  justify-content-center  fs-6 gap-3 p-5">
                  <div
                    className="bg-light rounded-circle d-flex flex-column  text-center pt-4 opacity-75 "
                    style={{ width: "10rem", height: "10rem" }}
                  >
                    <span className="fs-1">
                      <RiOpenArmLine />
                    </span>
                    Your bag is empty
                  </div>
                  <span> Start shopping now!</span>
                  <Link
                    to={"/products"}
                    className="btn btn-dark font-sm py-2 px-4 rounded-5 text-uppercase "
                  >
                    Let's Go!
                  </Link>
                </div>
              )}
            </div>
            {/* 統計區塊 */}
            <div className="col-lg-4 ms-auto d-flex flex-column fw-semibold">
              <div className="d-flex flex-column gap-2 p-5 bg-light rounded-top-5">
                <h3 className="text-black fw-bold ">All Lists</h3>
                {mergedCartItems &&
                  mergedCartItems.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between">
                      <span>{item.category}</span>
                      <span>{item.quantity}</span>
                    </div>
                  ))}
              </div>
              <div className="p-5 bg-light mt-1 rounded-bottom-5">
                <span className="d-flex  justify-content-between ">
                  <p>Procducts </p>
                  <p className="fs-5">${totalPrice}</p>
                </span>
                <span className="d-flex  justify-content-between ">
                  <p>Delivery Costs</p>
                  <p className="fs-5">$0</p>
                </span>
                <span className="d-flex  justify-content-between fw-bold text-black ">
                  <p>Total</p>
                  <p className="fs-2">${totalPrice}</p>
                </span>
                <button
                  className="text-center w-100 btn btn-dark rounded-5 p-2 text-uppercase font-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleStep("step2");
                  }}
                  disabled={cartItems.length === 0}
                >
                  next step
                </button>
                {cartItems.length === 0 && (
                  <div className="text-center text-secondary fw-normal mt-2 ">
                    請先添加商品至購物車
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <section
        className=" border-2  border-secondary p-0"
        style={{ borderLeft: "dashed" }}
      >
        <header className="btn border-0 position-relative ">
          <div
            className=" position-absolute d-flex align-items-center gap-2 "
            style={{ left: "-9px", top: "-12px" }}
          >
            <span className="pb-1">
              <RiCheckboxBlankCircleFill />
            </span>
            <span className="ps-1 fw-semibold">Step 02</span>
          </div>
          <h4 className="fw-bold p-3 m-0">Payment</h4>
        </header>
        {steps.step2 && (
          <div>
            <Payment toggleStep={toggleStep} />
          </div>
        )}
      </section>

      <section className=" p-0">
        <header className=" btn border-0 position-relative">
          <div
            className=" position-absolute d-flex align-items-center gap-2 "
            style={{ left: "-5px", top: "-12px" }}
          >
            <span className="pb-1">
              <RiCheckboxBlankCircleFill />
            </span>
            <span className="ps-1 fw-semibold">Step 03</span>
          </div>
          <h4 className="fw-bold p-3 m-0">Review</h4>
        </header>
        {steps.step3 && (
          <PaymentDetail
            cartItems={cartItems}
            userData={userData}
            mergedCartItems={mergedCartItems}
            toggleStep={toggleStep}
          />
        )}
      </section>
    </main>
  );
};

export default MyCart;
