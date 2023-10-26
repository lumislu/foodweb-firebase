import React, { useState } from "react";
import { BsCreditCard2Back, BsCashCoin } from "react-icons/bs";
import { FaApplePay } from "react-icons/fa";

import { useAuthContext } from "../context/authContext";

const Payment = ({ toggleStep }) => {
  const { userData, setUserData } = useAuthContext();

  const [selectedPayment, setSelectedPayment] = useState("creditCard");

  const paymentTypes = [
    {
      label: "creditCard",
      icon: <BsCreditCard2Back />,
    },
    {
      label: "applePay",
      icon: <FaApplePay />,
    },
    { label: "Cash", icon: <BsCashCoin /> },
  ];
  const handlePaymentChange = (paymentType) => {
    setSelectedPayment(paymentType);
  };
  const handleInputValue = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target);
    let updatedValue = value;
    if (type === "checkbox") {
      updatedValue = checked;
    }
    switch (name) {
      case "cardDate":
        updatedValue = value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d{0,2})/, "$1/$2");
        break;
      case "cardNumbers":
        updatedValue = value
          .replace(/\D/g, "")
          .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 - $2 - $3 - $4");
        break;
      default:
        break;
    }
    setUserData({ ...userData, [name]: updatedValue });
  };

  return (
    <form className="d-flex flex-column flex-lg-row  gap-5 px-4 pb-4 rounded-top-5 ">
      <fieldset className="d-flex flex-column  gap-3">
        <legend className="fs-6">Recipient Information</legend>
        {/* name */}
        <div className="d-flex gap-2">
          <div className="form-floating mb-3 ">
            <input
              type="text"
              className="form-control focus-ring  focus-ring-primary rounded-4  bg-light"
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputValue}
              required
            />
            <label htmlFor="firstname">First Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control  focus-ring  focus-ring-primary rounded-4  bg-light "
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputValue}
              required
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        {/* Destination / Region */}
        <div className="form-floating mb-3 ">
          <select
            className="form-select form-control focus-ring  focus-ring-primary rounded-4  bg-light font-sm"
            name="destination"
            id="destination"
            value={userData.destination}
            onChange={handleInputValue}
          >
            <option value="TW">Taiwan / TW</option>
            <option value="USD">Unite State / USD</option>
            <option value="JP">Japan / JP</option>
            <option value="ET">Alien / ET</option>
          </select>
          <label htmlFor="destination">Destination / Region</label>
        </div>
        {/* address */}
        <div className="form-floating mb-3 ">
          <input
            type="text"
            className="form-control focus-ring  focus-ring-primary rounded-4  bg-light"
            id="address"
            placeholder="address"
            name="address"
            value={userData.address}
            onChange={handleInputValue}
            required
          />
          <label htmlFor="address">Address</label>
        </div>
        {/* checkbox */}
        <div className="form-check">
          <input
            className="form-check-input   "
            type="checkbox"
            name="isSaved"
            id="isSaved"
            onChange={handleInputValue}
            value={userData.isSaved}
            checked={userData.isSaved}
          />
          <label className="form-check-label" htmlFor="isSaved">
            save payment info
          </label>
        </div>
      </fieldset>

      {/* payment */}
      <fieldset className="d-flex flex-column  gap-3">
        <legend className="fs-6">Select payment method</legend>
        <div className="d-flex">
          {paymentTypes.map((paymentType) => (
            <div key={paymentType.label}>
              <input
                type="radio"
                className="btn-check"
                name="paymentMode"
                id={paymentType.label}
                checked={selectedPayment === paymentType.label}
                value={paymentType.label}
                placeholder={paymentType.label}
                onChange={() => handlePaymentChange(paymentType.label)}
              />
              <label className="btn fs-4" htmlFor={paymentType.label}>
                {paymentType.icon}
              </label>
            </div>
          ))}
        </div>

        {selectedPayment === "creditCard" && (
          <div className="my-2">
            <h6>Add credit</h6>
            <div className="form-floating mb-3 d-flex  gap-3 ">
              <input
                type="text"
                className="form-control focus-ring  focus-ring-primary rounded-4  bg-light"
                id="cardNumbers"
                name="cardNumbers"
                maxLength={25}
                placeholder="CardNumbers"
                value={userData.cardNumbers}
                onChange={handleInputValue}
              />

              <label htmlFor="firstname">CardNums</label>
            </div>
            <div className="d-flex gap-2">
              <div className="form-floating mb-3 ">
                <input
                  type="text"
                  className="form-control focus-ring  focus-ring-primary rounded-4  bg-light"
                  id="cardDate"
                  name="cardDate"
                  pattern="\d{2}/\d{2}"
                  maxLength={5}
                  placeholder="MM/YY"
                  value={userData.cardDate}
                  onChange={handleInputValue}
                />
                <label htmlFor="firstname">Date (MM/YY)</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control  focus-ring  focus-ring-primary rounded-4  bg-light "
                  id="cardCVV"
                  placeholder="CVV"
                  name="cardCVV"
                  pattern="\d{3,4}"
                  maxLength={4}
                  value={userData.cardCVV}
                  onChange={handleInputValue}
                />
                <label htmlFor="lastname">CVV</label>
              </div>
            </div>
          </div>
        )}
        {selectedPayment === "Cash" && <span>現金付款</span>}
        {selectedPayment === "applePay" && <span>Apple Pay</span>}
        <div className="d-flex justify-content-between  gap-1">
          <button
            className="text-center w-100 btn btn-outline-dark  rounded-5 p-2 text-uppercase font-sm"
            onClick={(e) => {
              e.preventDefault();
              toggleStep("step1");
            }}
          >
            Prev
          </button>
          <button
            type="submit"
            className="text-center w-100 btn btn-dark rounded-5 p-2 text-uppercase font-sm"
            onClick={(e) => {
              e.preventDefault();
              toggleStep("step3");
            }}
          >
            Next
          </button>
        </div>
      </fieldset>

      {/* showcard */}
      {selectedPayment === "creditCard" && (
        <div className="d-flex flex-column position-relative position-relative  ">
          <div className="col-3 h-50 rounded-3 card-credit ">
            <div className="row d-flex flex-column gap-1 p-4 ">
              {/* logo */}
              <div className="masterlogo ms-auto me-4 mb-3"></div>
              {/* cardnums */}
              <span className="font-sm fw-semibold">Cardholder Name</span>

              <span className="text-center fw-semibold font-monospace ">
                {userData.cardNumbers || "**** **** **** ****"}
              </span>

              {/* card cardDate&cardCVV */}
              <div className="d-flex justify-content-between ">
                <span className="font-sm fw-semibold ">Cardholder Name</span>
                <span className="font-sm fw-semibold me-2">Date</span>
              </div>
              <div className="d-flex justify-content-between ">
                <span className=" fw-semibold  text-capitalize ">
                  {userData.firstName + userData.lastName || "Name"}
                </span>
                <span className=" fw-semibold ">
                  {userData.cardDate || "xx/xx"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Payment;
