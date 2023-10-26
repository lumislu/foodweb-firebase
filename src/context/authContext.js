// 建立一個產生 context 物件和管理狀態(useReducer)的檔案
import React from "react";

import { useReducer, createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ACTIONS.LOGIN":
      return { ...state, user: action.payload };
    case "ACTIONS.LOGOUT":
      return { ...state, user: null, alreadyLogin: false };
    case "ACTIONS.CHECKLOGIN":
      return {
        ...state,
        user: action.payload,
        alreadyLogin: action.payload !== null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const initState = {
    user: "",
    alreadyLogin: false,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const { user } = initState;
  const [userData, setUserData] = useState({
    displayName: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    firstName: "",
    lastName: "",
    address: "",
    destination: "TW",
    paymentMode: "creditCard",
    isSaved: false,
    cardNumbers: "",
    cardDate: "",
    cardCVV: "",
  });
  //確認user是否登入
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
  
        dispatch({
          type: "ACTIONS.CHECKLOGIN",
          payload: user,
        });
      } else {
        console.log("用戶未登入");
      }
    });

  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
