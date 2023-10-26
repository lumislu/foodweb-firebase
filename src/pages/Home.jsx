import React from "react";
import Hero from "../components/Hero";
import { Product, CommentCard } from "../components";
import { useProductContext } from "../context/productContext";
import { Link } from "react-router-dom";
import { useCommentContext } from "../context/commentContext";

const Home = () => {
  const { groupedItemsArray, setSelectedCategory } = useProductContext();
  const {
    Allcomments,
    commentNums,
    expandedComments,
    handleToggleExpand,
    moreComments,
  } = useCommentContext();
  
  const fliterCategory = groupedItemsArray.slice(1, 5);
  const filterComment = (Allcomments) => {
    if (Allcomments) {
      const result = Allcomments.sort((a, b) => b.timestamp - a.timestamp);
      return result;
    }
  };
  const lastestComments = filterComment(Allcomments);

  return (
    <div className=" container  d-flex flex-column py-4 gap-5 ">
      <Hero />
      {/* Category */}
      <div>
        <h2>Top Category</h2>
        <div
          className=" border-bottom border-2 border-black mb-3 "
          style={{ width: "5rem" }}
        />
        <div className="d-flex  align-items-center justify-content-center gap-3 px-2">
          {fliterCategory.map((item, index) => (
            <Link
              key={index}
              to={"/products"}
              className=" d-flex btn  btn-light opacity-75 w-100 "
              style={{
                backgroundImage: `url(${item.images[0]})`,
                height: "10rem",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => setSelectedCategory([item.category])}
            >
              <p
                className="text-bg-light px-2 py-3 rounded-1 fs-6  "
                style={{ width: "2rem", height: "6rem" }}
              >
                {item.category}
              </p>
            </Link>
          ))}
        </div>
      </div>
      {/* 商品區 */}
      <div>
        <h2>Our products</h2>
        <div
          className=" border-bottom border-2 border-black mb-3"
          style={{ width: "5rem" }}
        />
        <Product />
        <div className="d-flex  align-items-center  justify-content-center ">
          <Link
            to={"/products"}
            className="btn m-3 btn-outline-secondary rounded-0 font-sm"
          >
            產品頁面→
          </Link>
        </div>
      </div>
      {/* 廣告 */}
      <div className="d-flex align-items-center justify-content-around  bg-light px-5  ">
        <div>
          <h2 className="fw-bold">DISCOUNTED</h2>
          <p>Wonder Foods</p>
          <div className="d-flex gap-2">
            <div className="fs-1 fw-bold text-danger lh-sm">25</div>
            <div className=" font-sm fw-bold ">
              <div>%</div>
              <div>off</div>
            </div>
          </div>
          <p className="fw-bold mt-2">ON SALE</p>
        </div>
        <div
          className="border-end  border-2 border-secondary  opacity-50  mb-3"
          style={{ height: "5rem" }}
        />
        <img
          className="img-fluid "
          src="/images/food5nobg.png"
          alt="food"
          style={{ width: "10rem" }}
        />
      </div>
      {/* 最新評論 */}
      <div>
        <h2>Lastest Comment</h2>
        <div
          className=" border-bottom border-2 border-black mb-3"
          style={{ width: "5rem" }}
        />
        {lastestComments && lastestComments.length > 0 && (
          <div className="my-4 row  row-cols-1  row-cols-sm-3 ">
            {lastestComments.slice(0, moreComments).map((item, index) => (
              <div key={index}>
                <CommentCard
                  key={item.id}
                  comments={item}
                  commentNums={commentNums}
                  expandedComments={expandedComments[item.id]}
                  handleToggleExpand={() => handleToggleExpand(item.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
