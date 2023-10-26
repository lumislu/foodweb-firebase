import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useCommentContext } from "../context/commentContext";
import { useAuthContext } from "../context/authContext";
const CommentForm = ({ item, id }) => {
  const { Allcomments, setAllComments, addProductComment } =
    useCommentContext();
  const { user } = useAuthContext();
  const init = {
    userName: "",
    comment: "",
    productId: id,
    foodRating: 0,
  };

  const [newComment, setNewComment] = useState(init);
  const [clickRating, setClickRating] = useState(0);
  const [showCommentFormInput, setShowCommentFormInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment((input) => ({
      ...input,
      [name]: value,
    }));
  };

  const handleClickRating = (index) => {
    setClickRating(index);
    setShowCommentFormInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clickRating === 0) {
      return setShowCommentFormInput(true);
    }

    const commentInfo = {
      userId: user.uid || "",
      foodRating: clickRating,
      productId: item.id,
      userName: user.displayName || user.email || newComment.userName,
      comment: newComment.comment,
    };

    setNewComment(commentInfo);
    setAllComments([...Allcomments, commentInfo]);
    addProductComment(commentInfo);
    //初始化
    setNewComment(init);
    setClickRating(0);
    setShowCommentFormInput(false);
  };

  return (
    <form
      className="d-flex flex-column gap-3 bg-light p-5 rounded-4 "
      style={{ maxWidth: "600px", minHeight: "300px" }}
    >
      <div>
        <h6>評分及評論</h6>
        <label className="font-sm text-secondary">分享您的經驗給他人參考</label>
        {/* 選擇星星數量 */}
        <div className="text-secondary">
          {[1, 2, 3, 4, 5].map((index) => (
            <button
              type="button"
              key={index}
              className={` btn star  fs-4 ${
                index <= clickRating ? "text-warning" : ""
              }`}
              onClick={() => handleClickRating(index)}
            >
              <FaStar />
            </button>
          ))}
        </div>
      </div>
      {/* 填寫評論區 */}
      {showCommentFormInput && (
        <div className="d-flex flex-column gap-2 text-start px-2 font-sm  ">
          <div>
            <label className="form-label">名稱</label>
            <input
              type="text"
              name="userName"
              className="form-control font-sm"
              value={
                user.uid !== undefined
                  ? user.displayName || user.email
                  : newComment.userName
              }
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-label">內容</label>
            <textarea
              type="text"
              name="comment"
              className="form-control font-sm"
              value={newComment.comment}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      <button type="submit" className="btn btn-success " onClick={handleSubmit}>
        新增評論
      </button>
    </form>
  );
};

export default CommentForm;
