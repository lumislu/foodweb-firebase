import React, { useEffect, useState } from "react";
import { useCommentContext } from "../context/commentContext";
import { useProductContext } from "../context/productContext";
import PersentCircle from "./PersentCircle";
import CommentCard from "./CommentCard";

const CommentLists = ({ item }) => {
  const {
    moreComments,
    expandedComments,
    handleToggleExpand,
    commentNums,
    handleShowMoreClick,
    filterAndSortComments,
    calculateRating,
    commentLoading,
  } = useCommentContext();

  const { renderStars } = useProductContext();
  const [isfilter, setIsFilter] = useState("最舊");
  const filterBtns = ["最新", "最舊", "評分高"];

  const foundComments = filterAndSortComments(item, isfilter);
  const averageRating = calculateRating(foundComments);

  useEffect(() => {}, [averageRating, averageRating]);

  return (
    <div>
      {!commentLoading ? (
        <div className="row gy-5 gy-sm-0 justify-content-center  ">
          {/* rating */}
          <div className=" col-sm-5  ">
            {foundComments && (
              <div className="d-flex flex-column  align-items-center  gap-2 p-4">
                <h3 className="fs-6">商品評價</h3>

                <span className="text-secondary font-sm ">
                  共{foundComments.length}則評論
                </span>

                {/* renderstar */}

                {averageRating > 0 && (
                  <div
                    className="font-sm d-flex flex-sm-column justify-content-center  align-items-center fs-4 gap-sm-3"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <div>{renderStars(item)}</div>
                    <div className="d-sm-none">
                      <PersentCircle
                        rating={averageRating}
                        size={60}
                        strokeWidth={8}
                        font={"fs-6"}
                      />
                    </div>
                    <div className="d-none d-sm-flex ">
                      <PersentCircle
                        rating={averageRating}
                        size={80}
                        strokeWidth={10}
                        font={"fs-2"}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* comments area */}
          {foundComments && foundComments.length > 0 ? (
            <div className="col-sm-6 ">
              {/* filter btns */}
              <div className="col ">
                {filterBtns.map((type, index) => (
                  <button
                    key={index}
                    className={`btn rounded-5 btn-light  font-sm m-1 ${
                      isfilter === type
                        ? "text-black border border-1 border-secondary"
                        : "text-gray "
                    }`}
                    onClick={() => {
                      setIsFilter(type);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {/* comments */}
              <div
                className="col g-2 font-sm m-3 overflow-y-scroll"
                style={{ maxWidth: "400px", height: "280px" }}
              >
                {foundComments ? (
                  foundComments
                    .slice(0, moreComments)
                    .map((comment, index) => (
                      <CommentCard
                        key={index}
                        comments={comment}
                        commentNums={commentNums}
                        expandedComments={expandedComments[comment.docId]}
                        handleToggleExpand={() =>
                          handleToggleExpand(comment.docId)
                        }
                      />
                    ))
                ) : (
                  <div className="col text-center">
                    <p>Loading...</p>
                  </div>
                )}
                {foundComments.length > moreComments && (
                  <button
                    className="btn btn-link link-offset-2 font-sm link-secondary  "
                    onClick={handleShowMoreClick}
                  >
                    更多評論
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="col-sm-6 ">尚無評論</div>
          )}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default CommentLists;
