import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "user@gmail.com",
    password: "123456",
  });

  const { logIn, signInWithGoogle, signInAnyone, Loading, error } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    logIn(formData.email, formData.password);
  };
  const googleSubmit = (e) => {
    e.preventDefault();
    signInWithGoogle();
  };
  const anyoneSubmit = (e) => {
    e.preventDefault();
    signInAnyone();
  };
  return (
    <div className="d-flex flex-column  align-items-center  justify-content-center flex-grow-1  ">
      <form className=" d-flex flex-column align-items-center justify-content-center gap-4 ">
        <h2>
          <span>L</span>ogin
        </h2>
        {/* Email */}
        <div>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        {/* Password */}
        <div>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>

        <div className="d-flex flex-column gap-2">
          {/* // 一般登入 */}
          {!Loading ? (
            <button
              onClick={loginSubmit}
              className="btn btn-primary fw-semibold"
            >
              Login
            </button>
          ) : (
            <button className="btn bg-body-secondary " disabled>
              loading
            </button>
          )}

          {/* // 谷歌登入 */}
          {!Loading ? (
            <button
              onClick={googleSubmit}
              className="btn btn-outline-dark  fw-semibold"
            >
              Google登入
            </button>
          ) : (
            <button className="btn bg-body-secondary " disabled>
              loading
            </button>
          )}

          {/* // 匿名登入 */}
          {!Loading ? (
            <button
              onClick={anyoneSubmit}
              className="btn btn-outline-secondary  fw-semibold"
            >
              匿名登入
            </button>
          ) : (
            <button className="btn bg-body-secondary " disabled>
              loading
            </button>
          )}
        </div>

        <span className="fw-medium d-flex gap-1" style={{ fontSize: "14px" }}>
          Not a member?
          <Link to="/signup" className="fw-semibold">
            Signup
          </Link>
          here
        </span>
        {/* // 顯示錯誤訊息 */}
        {error && <p className="text-danger fw-medium">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
