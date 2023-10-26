import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  useEffect(() => {
    let timeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    let countTimeout = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(countTimeout);
    };
  }, [navigate]);
  return (
    <div className="d-flex flex-column   align-items-center  justify-content-center vh-100 gap-3 ">
      <h1>Oops ! Error Page ：（ </h1>
      <p>將在{count}秒回到首頁</p>
    </div>
  );
};

export default Page404;
