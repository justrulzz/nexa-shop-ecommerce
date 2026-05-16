import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import {Layout} from "./layouts/layout";
import CartProvider from "./context/CartProvider.jsx";
import FavoritesProvider from "./context/FavoritesProvider.jsx";
import "./index.css";



import ScrollToTop from "./components/ScrollToTop";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ScrollToTop/>
    <CartProvider>
      <FavoritesProvider>
        <Layout>
          <App />
        </Layout>
      </FavoritesProvider>
    </CartProvider>
  </BrowserRouter>
);                         