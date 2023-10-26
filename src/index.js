import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./custom.css";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { ProductContextProvider } from "./context/productContext";
import { CommentContextProvider } from "./context/commentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <ProductContextProvider>
      <CommentContextProvider>
        <App />
      </CommentContextProvider>
    </ProductContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
);
