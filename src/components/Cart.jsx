import React from "react";
import { useProductContext } from "../context/productContext";
import QuantitySelector from "../components/QuantitySelector";

const Cart = () => {
  const { cartItems, handleCartItems, removeCart } = useProductContext();
  const handleInputChange = (e, item) => {
    handleCartItems(item, e.target.value);
  };
  const handleIncrement = (item) => {
    handleCartItems(item, item.quantity + 1);
  };
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      handleCartItems(item, item.quantity - 1);
    }
  };

  return (
    <section className="text-center px-4">
      {/* lg */}
      <table className="d-none   d-lg-table  table  table-hover  align-middle mx-auto  ">
        <thead>
          <tr>
            <th className=" col  text-capitalize "></th>
            <th className=" col  text-capitalize">product</th>
            <th className=" col  text-capitalize">quantity</th>
            <th className=" col  text-capitalize">price</th>
            <th className=" col  text-capitalize"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>
                <figure
                  className="m-auto rounded-4 overflow-hidden "
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.images[0]}
                    className="w-100 h-100 object-fit-cover "
                  />
                </figure>
              </td>
              <td className="col fw-normal   ">{item.title}</td>
              <td>
                <QuantitySelector
                  quantity={item.quantity}
                  handleDecrement={() => handleDecrement(item)}
                  handleIncrement={() => handleIncrement(item)}
                  handleInputChange={() => handleInputChange(item)}
                />
              </td>
              <td className="col  ">${item.total}</td>
              <td className="col " onClick={() => removeCart(item)}>
                <button className="btn btn-close p-2 text-black font-sm"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* sm */}
      <table className="d-lg-none table table-hover  align-middle mx-auto  ">
        <thead>
          <tr>
            <th className=" col  text-capitalize">product</th>
            <th className=" col  text-capitalize">price</th>
            <th className=" col  text-capitalize"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex flex-column ">
                  <figure
                    className="m-auto rounded-4 overflow-hidden "
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.images[0]}
                      className="w-100 h-100 object-fit-cover "
                    />
                  </figure>
                  <span>{item.title}</span>
                  <span>
                    <QuantitySelector
                      quantity={item.quantity}
                      handleDecrement={() => handleDecrement(item)}
                      handleIncrement={() => handleIncrement(item)}
                      handleInputChange={() => handleInputChange(item)}
                    />
                  </span>
                </div>
              </td>
              <td className="col  ">${item.total}</td>
              <td className="col " onClick={() => removeCart(item)}>
                <button className="btn btn-close p-2 text-black font-sm"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Cart;
