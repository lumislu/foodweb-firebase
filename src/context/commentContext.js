import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { Timestamp, collection, addDoc, getDocs } from "firebase/firestore";

const CommentContext = createContext();

export const useCommentContext = () => {
  return useContext(CommentContext);
};
export const CommentContextProvider = ({ children }) => {
  const [commentLoading, setCommentLoading] = useState(false);
  const [Allcomments, setAllComments] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});
  const [moreComments, setMoreComments] = useState(3);

  const [lastRequestTime, setLastRequestTime] = useState(0);

  //預設留言字數
  const commentNums = 20;

  //獲取全部留言
  const getProductComment = async () => {
    try {
      const commentsCollection = collection(db, "comments");
      const commentsSnapshot = await getDocs(commentsCollection);

      const allComments = [];
      commentsSnapshot.forEach((doc) => {
        const commentData = doc.data();
        if (commentData.timestamp) {
          const timestamp = commentData.timestamp.toDate();
          const stringDate = new Date(timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const stringTime = timestamp.toLocaleTimeString();
          const docId = doc.id;

          allComments.push({ ...commentData, stringDate, stringTime, docId });
        }
      });
      console.log("獲取留言資訊");
      setAllComments(allComments);
      return allComments;
    } catch (e) {
      console.log(e, "獲取留言失敗");
    }
  };
  //增加留言
  const addProductComment = async (commentInfo) => {
    try {
      const commentRef = collection(db, "comments");

      const { userId, foodRating, productId, userName, comment } = commentInfo;
      const commetData = {
        userId,
        foodRating,
        productId,
        userName,
        comment,
        timestamp: Timestamp.fromDate(new Date()),
      };
      await addDoc(commentRef, commetData);

      console.log("成功創建/更新留言");
    } catch (e) {
      console.log(e);
    }
  };

  //找到符合商品 id 的留言
  const filterAndSortComments = (item, isfilter) => {
    const foundComments = Allcomments.filter(
      (comment) => comment.productId === item.id
    );

    // 排序留言
    const sortedComments = [...foundComments];

    switch (isfilter) {
      case "最新":
        sortedComments.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case "最舊":
        sortedComments.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case "評分高":
        sortedComments.sort((a, b) => b.foodRating - a.foodRating);
        break;
      default:
        sortedComments.sort((a, b) => a.timestamp - b.timestamp);
        break;
    }

    return sortedComments;
  };
  //計算rating
  const calculateRating = (foundComments) => {
    const commentsWithRating = foundComments.map((comment) => ({
      ...comment,
      foodRating: comment.foodRating || 0,
    }));

    const totalRating = commentsWithRating.reduce((accumulator, item) => {
      return accumulator + item.foodRating;
    }, 0);
    const result = totalRating / foundComments.length;

    return result;
  };

  //more評論開關
  const handleToggleExpand = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  //看更多留言
  const handleShowMoreClick = () => {
    setMoreComments(Math.min(moreComments + 4, Allcomments.length));
  };
  const throttlingDownload = async () => {
    setCommentLoading(true);
    const now = Date.now();
    if (now - lastRequestTime > 1000) {
      await getProductComment();
      setLastRequestTime(now);
      setCommentLoading(false);
    }
  };

  useEffect(() => {
    throttlingDownload();
  }, []);

  return (
    <CommentContext.Provider
      value={{
        Allcomments,
        setAllComments,
        moreComments,
        commentNums,
        handleShowMoreClick,
        expandedComments,
        handleToggleExpand,
        addProductComment,
        getProductComment,
        commentLoading,
        setCommentLoading,
        filterAndSortComments,
        calculateRating,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
