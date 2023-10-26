import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  Login,
  Signup,
  Products,
  Contact,
  About,
  Productpage,
  MyCart,
  NotFound,
  Layout,
  Profile,
  Searchpage,
} from "./pages";
import { useAuthContext } from "./context/authContext";

const App = () => {
  const { alreadyLogin } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Productpage />} />
          <Route
            path="/login"
            element={alreadyLogin ? <Home /> : <Login replace />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/search/:query" element={<Searchpage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
