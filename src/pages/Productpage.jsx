import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiFillCheckCircle } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import {
  Card,
  CommentForm,
  CommentLists,
  QuantitySelector,
  Message,
  MyButton,
} from "../components";

import { useProductContext } from "../context/productContext";

const Productpage = () => {
  const { id } = useParams();
  const {
    foundItem,
    handleCartItems,
    toggleFavorite,
    foundSameCategory,
    favoriteAndCartClass,
    productLoading,
  } = useProductContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [count, setCount] = useState(1);
  const [isfavorite, setIsFavorite] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);

  const [addmsg, setAddmsg] = useState();

  const item = foundItem(id);
  const foundCategory = foundSameCategory(item);
  const favoriteAndCartBtnClass = favoriteAndCartClass(
    addmsg,
    cartToggle,
    isfavorite
  );

  const handleselectedImage = (index) => {
    setSelectedImage(index);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (!isfavorite) {
      setAddmsg("加入收藏");
    } else {
      setAddmsg("取消收藏");
    }
    toggleFavorite(item);
    setIsFavorite(!isfavorite);

    setTimeout(() => {
      setAddmsg("");
    }, 500);
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!cartToggle) {
      handleCartItems(item, count);
      setAddmsg("加入購物車");
      setCartToggle(true);
    } else {
      setAddmsg("");
    }

    setTimeout(() => {
      setAddmsg("");
      setCartToggle(false);
    }, 500);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {}, [id]);
  console.log(item);
  return (
    <div>
      {!productLoading && item ? (
        <div className="container py-5  position-relative   ">
          {/* 食物介紹區 */}
          <section className="position-relative row justify-content-around gy-5  mb-5 ">
            {/* 食物照片區 */}
            <div className="col-sm-7 d-flex  flex-column   align-items-center gap-2 ">
              <figure
                className=" img-fluid  rounded-4 "
                style={{
                  width: "30rem",
                  height: "20rem",
                  backgroundImage: `url(${item.images[selectedImage]}`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <div className="d-flex gap-1 ">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    className="btn rounded-3"
                    style={{
                      width: "2rem",
                      height: "3rem",
                      backgroundImage: `url(${image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    onClick={() => handleselectedImage(index)}
                  ></button>
                ))}
              </div>
            </div>
            {/* 食物描述區 */}
            <div className="col-8 col-sm-5 d-flex flex-column align-items-center  align-items-md-start  gap-4">
              <h1>{item.title}</h1>
              <span className="fs-5 fw-bold">NT${item.price}</span>
              <p>{item.description}</p>

              <QuantitySelector
                quantity={count}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleInputChange={(e) => setCount(e.target.value)}
              />
              <div className="d-flex gap-4 ">
                <MyButton
                  text={"加入購物車"}
                  icon={<BsCart />}
                  handleFunc={handleAddToCart}
                  others={cartToggle ? "gap-1 " : "btn-success gap-1 "}
                />
                <MyButton
                  text={""}
                  icon={isfavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                  handleFunc={handleToggleFavorite}
                  others={isfavorite ? " text-danger gap-1 " : "gap-1 "}
                />
              </div>
              {addmsg && (
                <Message
                  backgroundColorClass={favoriteAndCartBtnClass}
                  addmsg={addmsg}
                  icon={<AiFillCheckCircle />}
                />
              )}
            </div>
          </section>

          <hr />
          {/* 評論區 */}
          {
            <section className="d-flex flex-column   gap-4 text-center  ">
              <div>
                <CommentLists item={item} id={id} />
              </div>

              <div className="d-flex  justify-content-center  ">
                <CommentForm item={item} id={id} />
              </div>
            </section>
          }
          {/* 同類食物區 */}
          {foundCategory && foundCategory.length !== 0 && (
            <div className="row justify-content-center mt-5 p-2">
              <h3 className="fs-6  text-center ">相似產品</h3>
              <div className="d-flex flex-wrap  justify-content-center ">
                {foundCategory.map((item, index) => (
                  <div key={index} className="">
                    <Card item={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default Productpage;
