import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCommentContext } from "../context/commentContext";

const CommentCard = ({
  comments,
  expandedComments,
  handleToggleExpand,
  commentNums,
}) => {
  const { commentLoading } = useCommentContext();

  return (
    <div className="col  ">
      {!commentLoading ? (
        <div className=" rounded-4 d-flex justify-content-between align-items-center p-3 gap-3">
          <div className="d-flex align-items-start justify-content-center  gap-2">
            {/* 預設頭貼 */}
            <figure
              className="bgc-main rounded-circle  text-light fw-bolder text-uppercase text-center  fs-4"
              style={{
                minWidth: "3rem",
                minHeight: "3rem",
                lineHeight: "3rem",
              }}
            >
              {comments.userName.slice(0, 1)}
            </figure>
            {/* 留言區 字數超過20字收起來 */}
            <div className="d-flex flex-column align-items-start ">
              <span className="fw-bold font-sm">{comments.userName}</span>
              {expandedComments || comments.comment.length < commentNums ? (
                <span className="font-sm text-start  ">{comments.comment}</span>
              ) : (
                <span className="font-sm text-start ">
                  {comments.comment.slice(0, commentNums)}
                  <Link
                    className="link-secondary link-underline-opacity-0 font-sm"
                    onClick={() => handleToggleExpand(comments.id)}
                  >
                    ...more
                  </Link>
                </span>
              )}
            </div>
          </div>
          {/* rating星星 */}
          <span
            className="d-flex align-items-center gap-1 text-warning "
            style={{ whiteSpace: "nowrap" }}
          >
            <span className="text-color "> {comments.foodRating}</span>

            <FaStar />
          </span>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default CommentCard;
