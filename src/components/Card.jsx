import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import { useCommentContext } from "../context/commentContext";
import Message from "./Message";
import MyButton from "./MyButton";

const Card = ({ item }) => {
  const { handleCartItems, toggleFavorite, renderStars, favoriteAndCartClass } =
    useProductContext();

  const { Allcomments, calculateRating } = useCommentContext();

  const [isHovered, setIsHovered] = useState(false);
  const [addmsg, setAddmsg] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);

  //根據商品id從所有留言中找到匹配商品id的留言
  const foundComments = Allcomments.filter(
    (comment) => comment.productId === item.id
  );
  const averageRating = calculateRating(foundComments);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (!isFavorite) {
      setAddmsg("加入收藏");
    } else {
      setAddmsg("取消收藏");
    }
    toggleFavorite(item);
    setIsFavorite(!isFavorite);

    setTimeout(() => {
      setAddmsg("");
    }, 500);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!cartToggle) {
      handleCartItems(item);
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

  const favoriteAndCartBtnClass = favoriteAndCartClass(
    addmsg,
    cartToggle,
    isFavorite
  );

  return (
    <div
      className="col position-relative m-md-2 p-1 p-sm-0 "
      style={{ width: "170px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/products/${item.id}`}
        className="text-secondary rounded-2 btn btn-light w-100 p-0 overflow-hidden "
        style={{
          textDecoration: "none",
        }}
      >
        <img
          src={item.thumbnail}
          className="img-fluid object-fit-cover w-100    "
          style={{ height: "180px" }}
          alt={item.name}
        />
        {/* 資訊 */}
        <div className="d-flex justify-content-between align-items-center  text-start gap-2 p-2">
          <div className="m-1">
            <h6 className="font-sm m-0">{item.title}</h6>
            <span className="font-sm">${item.price}</span>
          </div>
          <span
            className="d-none d-sm-flex  font-sm  align-items-center"
            style={{ whiteSpace: "nowrap" }}
          >
            {renderStars(averageRating)}
            {/* <span className="font-sm">({foundComments.length})</span> */}
          </span>
          <div className="d-sm-none font-sm  d-flex align-items-center gap-1 ">
            {averageRating.toFixed(1)}
            <span className="text-warning">
              <FaStar />
            </span>
          </div>
        </div>
        {/* hover時選擇加入購物車或收藏 */}
        {isHovered && (
          <div className="position-absolute  d-flex top-0  end-0  w-100 h-100 align-items-center justify-content-center  gap-2">
            <div className="position-absolute top-0"></div>
            <MyButton
              text={""}
              icon={<BsCart />}
              handleFunc={handleAddToCart}
              others={cartToggle ? " btn-success " : "bg-light "}
            />
            <MyButton
              text={""}
              icon={isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              handleFunc={handleToggleFavorite}
              others={isFavorite ? "bg-light text-danger " : "bg-light "}
            />
          </div>
        )}
        {/* 訊息 */}
        {addmsg && (
          <Message
            backgroundColorClass={favoriteAndCartBtnClass}
            addmsg={addmsg}
            icon={<AiFillCheckCircle />}
          />
        )}
      </Link>
    </div>
  );
};

export default Card;
