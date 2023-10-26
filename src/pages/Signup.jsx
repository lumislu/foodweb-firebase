import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Signup = () => {
  const { signUp, Loading, error } = useAuth();
  const navigate = useNavigate();

  // init email, password, displayname states
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(formdata.email, formdata.password, formdata.displayName);

    if (!Loading && !error) {
      alert(`註冊成功!`);
      navigate("/");
    }
  };

  return (
    <div className="p-5 flex-grow-1 d-flex align-items-center  justify-content-center ">
      <form
        onSubmit={handleSubmit}
        className=" d-flex flex-column align-items-center justify-content-center gap-4"
      >
        <h2>
          <span>S</span>ignup
        </h2>
        {/* DisplayName */}
        <div>
          <span>Username:</span>
          <input
            type="text"
            value={formdata.displayName}
            name="displayName"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        {/* Email */}
        <div>
          <span>Email:</span>
          <input
            type="email"
            value={formdata.email}
            name="email"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        {/* Password */}
        <div>
          <span>Password:</span>
          <input
            type="password"
            value={formdata.password}
            name="password"
            className="form-control"
            placeholder="At least 6 digits"
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* // 如果 pending 狀態為 false，顯示 Signup btn */}
          {!Loading ? (
            <button to="/login" className="btn btn-primary fw-semibold">
              Signup
            </button>
          ) : (
            <button className="btn bg-body-secondary " disabled>
              Registering
            </button>
          )}
          {/* // 如果 pending 狀態為 true，顯示 Registering btn */}
        </div>
        <p className="fw-medium" style={{ fontSize: "14px" }}>
          Already a member?{" "}
          <Link to="/login" className="fw-semibold">
            Login
          </Link>{" "}
          here
        </p>
        {/* // 顯示錯誤訊息 */}

        {error && <p className="text-danger fw-medium">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
