import React from "react";

const Order = ({ order, isOpen,  toggleOrder }) => {

  return (
    <div>
      {!isOpen && (
        <div>
          <div
            key={order.docId}
            className="btn d-flex flex-column  flex-sm-row  align-items-center  justify-content-center  bg-light rounded-4 m-0 p-3 gap-3 "
          >
            <div style={{ width: "150px", height: "100px" }}>
              <img
                src={order.cartItems[0].thumbnail}
                className="w-100 h-100 object-fit-cover rounded-3  overflow-hidden  "
                alt=""
              />
            </div>
            <div className="d-flex flex-column  font-sm gap-1">
              <span className="fw-semibold me-1 text-start">
                Status: Pending
              </span>
              <div className="d-flex  text-start ">
                <span className="fw-semibold me-1"> Date:</span>
                {order.stringDate}
              </div>

              <div className="d-flex    text-start ">
                <span className="fw-semibold me-2 text-start">Lists:</span>
                <div className="d-flex flex-column ">
                  {order.mergedCartItems.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column   justify-content-center gap-2"
                    >
                      <div>
                        <span>{item.category}</span>
                        {item.quantity > 1 ? (
                          <span>{item.quantity} servings</span>
                        ) : (
                          <span>{item.quantity} serving</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="d-flex flex-column text-center gap-2 fw-bold">
              <span>TotalPrice: </span>
              <span className="fs-4  "> ${order.totalPrice}</span>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="  d-flex flex-column  justify-content-center   align-items-center  gap-3  p-4 rounded-4   bg-light border border-1 z-1 ">
          <button
            className=" btn-close  fs-3 z-1   p-4 rounded-circle btn-light bg-light   "
            style={{ left: "50%", top: "-4rem" }}
            onClick={toggleOrder}
          ></button>
          <div className="row justify-content-center  m-1 p-sm-4  rounded-4 font-sm ">
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
                  {order.cartItems.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.category}</td>
                      <td>
                        <figure
                          className="rounded-4 overflow-hidden"
                          style={{ width: "50px", height: "50px" }}
                        >
                          <img
                            src={item.images[0]}
                            alt={item.images[0]}
                            className="w-100 h-100 object-fit-cover"
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
                {order && order.paymentData && (
                  <div>
                    <div className="d-flex align-items-center justify-content-between   ">
                      <span className=" fw-semibold ">Name:</span>

                      <span>
                        {order.paymentData.firstName +
                          " " +
                          order.paymentData.lastName}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between  ">
                      <span className=" fw-semibold">Address:</span>
                      <span>{order.paymentData.address}</span>
                    </div>
                    <div className="d-flex  align-items-center justify-content-between  ">
                      <span className=" fw-semibold ">PaymentMethod:</span>
                      <span>{order.paymentData.paymentMode}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="  d-flex flex-column fw-semibold">
                <div className=" d-flex flex-column gap-2  rounded-top-5">
                  <h6 className="text-black fw-bold ">All Lists</h6>
                  {order.mergedCartItems &&
                    order.mergedCartItems.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between"
                      >
                        <span>{item.category}</span>
                        <span>{item.quantity}</span>
                      </div>
                    ))}
                </div>
                <div className="  mt-1 rounded-bottom-5">
                  <span className="d-flex  justify-content-between  ">
                    <p>Procducts </p>
                    <p className="fs-5">${order.totalPrice}</p>
                  </span>
                  <span className="d-flex  justify-content-between ">
                    <p>Delivery Costs</p>
                    <p className="fs-5">$0</p>
                  </span>
                  <span className="d-flex  justify-content-between fw-bold text-black ">
                    <p>Total</p>
                    <p className="fs-2">${order.totalPrice}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
