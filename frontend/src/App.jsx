import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./components/pages/HomePage";     
import ShopPage from "./components/pages/ShopPage";
import ContactPage from "./components/pages/ContactPage";
import CartPage from "./components/pages/CartPage";
import AuthPage from "./components/pages/AuthPage";
import BlogPage from "./components/pages/BlogPage";
import BlogDetailsPage from "./components/pages/BlogDetailsPage";
import ProductDetailsPage from "./components/pages/ProductDetailsPage";
import UserPage from "./components/pages/Admin/UserPage";
import CategoryPage from "./components/pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./components/pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./components/pages/Admin/Categories/CreateCategoryPage";
import CreateProductPage from "./components/pages/Admin/Products/CreateProductPage";
import ProductPage from "./components/pages/Admin/Products/ProductPage";
import UpdateProductPage from "./components/pages/Admin/Products/UpdateProductPage";
import CouponPage from "./components/pages/Admin/Coupons/CouponPage";
import CreateCouponPage from "./components/pages/Admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./components/pages/Admin/Coupons/UpdateCouponPage";
import Success from "./components/pages/Success";
import OrderPage from "./components/pages/Admin/OrderPage";
import DashboardPage from "./components/pages/Admin/DashboardPage";
import CategoryProductsPage from "./components/pages/CategoryProductsPage";


import Chatbot from "./components/Chatbot/Chatbot";

function App() { 
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
        
        <Route path="/admin/*">
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="categories/create" element={<CreateCategoryPage />} /> 
          <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
          <Route path="products/create" element={<CreateProductPage />} /> 
          <Route path="products" element={<ProductPage />} />
          <Route path="products/update/:id" element={<UpdateProductPage />} />
          <Route path="coupons" element={<CouponPage />} />
          <Route path="coupons/create" element={<CreateCouponPage />} />
          <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
          <Route path="orders"  element={<OrderPage />} />
        </Route>
      </Routes>

      {/* Asistanımız tüm rotaların dışında ama ana kapsayıcının içinde */}
      <Chatbot />
    </>
  );
}

export default App;