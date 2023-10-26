import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { auth, googleProvider, db } from "../firebase-config";
import {
  doc,
  Timestamp,
  setDoc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

export const useAuth = () => {
  const [error, setError] = useState();
  const [Loading, setLoading] = useState(false);
  const { user, dispatch, userData, setUserData } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setError(null);
    setLoading(true);
    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("註冊失敗，請稍後再試");
      }

      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      // fire login action
      dispatch({
        type: "ACTIONS.LOGIN",
        payload: res.user,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (!res) {
        throw new Error("google登入失敗，請稍後再試");
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const signInAnyone = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInAnonymously(auth);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const logIn = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("登入失敗，請稍後再試");
      }
      dispatch({ type: "ACTIONS.LOGIN", payload: res.user });

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      dispatch({
        type: "ACTIONS.LOGOUT",
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateUser = async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const userUID = user.uid || "";
      const { displayName, email, photoURL, address } = userData;
      const res = await updateProfile(auth.currentUser, {
        displayName,
        email,
        photoURL,
      });

      const usersCollection = collection(db, "users");
      const userDocRef = doc(usersCollection, userUID);
      const userInfo = {
        userUID,
        address,
      };
      const userDoc = await setDoc(userDocRef, userInfo, { merge: true });
      if (!res || !userDoc) {
        console.log("更新個人資料失敗");
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
    }
  };
  const getUser = async () => {
    setLoading(true);
    try {
      const usersCollection = collection(db, "users");
      const userDocRef = doc(usersCollection, user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        if (userData) {
          const UserData = {
            ...userData,
            displayName: user.displayName,
            email: user.email,
            address: userData.address,
          };
          setUserData(UserData);
          return UserData;
        }
        setLoading(false);
        console.log("獲取用戶資訊");
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "獲取用戶資訊失敗");
    }
  };

  const AddUserOrderData = async (cartItems, totalPrice, mergedCartItems) => {
    setLoading(true);
    try {
      const userUID = user.uid || "";
      const ordersDocRef = collection(db, "orders");
      const {
        firstName,
        lastName,
        address,
        destination,
        paymentMode,
        isSaved,
        cardNumbers,
        cardDate,
        cardCVV,
      } = userData;

      const paymentData = {
        firstName,
        lastName,
        address,
        destination,
        paymentMode,
        isSaved,
        ...(paymentMode === "creditCard" && { cardNumbers, cardDate, cardCVV }),
      };

      const ordersInfo = {
        userUID,
        paymentData,
        cartItems,
        totalPrice,
        mergedCartItems,
        timestamp: Timestamp.fromDate(new Date()),
      };
      const order = await addDoc(ordersDocRef, ordersInfo);
      if (!order) {
        console.log("創建失敗");
      }
      setLoading(false);
      console.log("成功創建/更新訂單");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getUserOderData = async () => {
    setLoading(true);
    try {
      const ordersCollection = collection(db, "orders");
      const userOrdersQuery = query(ordersCollection, user.uid);
      const querySnapshot = await getDocs(userOrdersQuery);
      const allOrders = [];
      querySnapshot.forEach((doc) => {
        const orderData = doc.data();
        const timestamp = orderData.timestamp.toDate();
        const stringDate = new Date(timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const stringTime = timestamp.toLocaleTimeString();
        const docId = doc.id;

        allOrders.push({ ...orderData, stringDate, stringTime, docId });

        setLoading(false);
      });

      return allOrders;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return {
    signUp,
    logIn,
    logOut,
    signInWithGoogle,
    signInAnyone,
    updateUser,
    AddUserOrderData,
    getUserOderData,
    setUserData,
    userData,
    getUser,
    setLoading,
    Loading,
    error,
  };
};
