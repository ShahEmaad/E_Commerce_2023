import {Routes,Route } from "react-router-dom";
//Pages
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";

import About from "./pages/About";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";

import User from "./pages/Admin/User";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCatigory";

import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";

import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";

import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";

import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/users" element={<User />} />
        </Route>
        
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
