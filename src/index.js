import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ExpenseContextProvider } from "./store/cart-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ExpenseContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ExpenseContextProvider>
);
