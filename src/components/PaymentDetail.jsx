import React from "react";
import { useProductContext } from "../context/productContext";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

const PaymentDetail = ({
  cartItems,
  userData,
  mergedCartItems,
  toggleStep,
}) => {
  const { totalPrice } = useProductContext();
  const { AddUserOrderData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await AddUserOrderData(cartItems, totalPrice, mergedCartItems);
    navigate("/profile");
  };
  return (
    <div className="row justify-content-center  p-5 bg-light rounded-4 ">
      <div className="col-lg-10 text-center">
        <h6 className="text-start  fw-bold ">Products</h6>
        <table className="col-12 align-middle">
          <thead>
            <tr>
              <th className="text-capitalize ">category</th>
              <th className="text-capitalize"></th>
              <th className="text-capitalize">product</th>
              <th className=" text-capitalize">quantity</th>
              <th className="text-capitalize">price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>
                  <figure
                    className=" rounded-4 overflow-hidden "
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.images[0]}
                      className="w-100 h-100 object-fit-cover "
                    />
                  </figure>
                </td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-lg-10   my-4 ">
        <h6 className="text-start  fw-bold ">Recipient Information</h6>
        <div className=" d-flex flex-column  text-uppercase ">
          <div className="d-flex align-items-center justify-content-between   ">
            <span className=" fw-semibold ">Name:</span>
            <span>{userData.firstName + " " + userData.lastName}</span>
          </div>
          <div className="d-flex align-items-center justify-content-between  ">
            <span className=" fw-semibold">Address:</span>
            <span>{userData.address}</span>
          </div>
          <div className="d-flex  align-items-center justify-content-between  ">
            <span className=" fw-semibold ">PaymentMethod:</span>
            <span>{userData.paymentMode}</span>
          </div>
        </div>
        <div className="  d-flex flex-column fw-semibold">
          <div className=" d-flex flex-column gap-2  rounded-top-5">
            <h6 className="text-black fw-bold ">All Lists</h6>
            {mergedCartItems &&
              mergedCartItems.map((item, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <span>{item.category}</span>
                  <span>{item.quantity}</span>
                </div>
              ))}
          </div>
          <div className="  mt-1 rounded-bottom-5">
            <span className="d-flex  justify-content-between  ">
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

            <div className="d-flex justify-content-between gap-3">
              <button
                className="text-center  w-100 btn btn-outline-dark  rounded-5 p-2 text-uppercase font-sm"
                onClick={(e) => {
                  e.preventDefault();
                  toggleStep("step2");
                }}
              >
                Prev
              </button>
              <button
                className="text-center w-100 btn btn-dark rounded-5 p-2 text-uppercase font-sm"
                onClick={handleSubmit}
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
