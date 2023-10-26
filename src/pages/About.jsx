import React from "react";

const About = () => {
  const contents = [
    {
      title: "關於我們",
      des: "歡迎來到TastyVoyage，我們是一家熱情洋溢的餐廳，致力於為您提供美味的美食和難忘的用餐體驗。我們的故事始於對食物的熱愛，以及對創造獨特味蕾體驗的激情。",
    },
    {
      title: "我們的使命",
      des: " 我們的使命是將世界各地的風味融入我們的菜單，讓您的味蕾踏上一場全球美食之旅。我們自豪地使用新鮮的食材，精心烹飪和呈現每一道菜肴，以滿足您的挑剔口味。",
    },
    {
      title: "我們的團隊",
      des: "  TastyVoyage的團隊由熱情和有創意的廚師組成，他們不斷探索和創新，為您帶來獨特的風味。我們的友好服務團隊致力於確保您在餐廳度過愉快的時光。",
    },
    {
      title: "歡迎您的光臨",
      des: "我們真誠地歡迎您來TastyVoyage，與我們一同品味美食的樂趣。無論是與親朋好友的聚餐、浪漫的約會還是商務午餐，我們都期待著為您提供難忘的用餐體驗。",
    },
  ];
  return (
    <div className="container p-4 d-flex flex-column  align-items-center  justify-content-center  text-center gap-5 ">
      <img src="/images/foodbanner.jpg" alt="" className=" img-fluid w-50  " />
      <h1 className="nav-link logo fw-bold  fs-1">TastyVoyage.</h1>
      <div className="d-flex   align-items-center  justify-content-center gap-2 rounded-2 ">
        {contents.map((item, index) => (
          <div key={index} className="bg-light p-4 rounded-4 ">
            <h6 className="text-color">{item.title}</h6>
            <span className="font-sm">{item.des}</span>
          </div>
        ))}
      </div>
      <p>謝謝您的支持，我們期待與您相聚在TastyVoyage！</p>
    </div>
  );
};

export default About;
