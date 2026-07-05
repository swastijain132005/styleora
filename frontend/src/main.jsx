import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

import HomePage from "./landing_page/home/homepage.jsx";
import Navbar from "./landing_page/Navbar.jsx";
import Signup from "./landing_page/signup/signup.jsx";
import Login from "./landing_page/signup/login.jsx";
import Logout from "./landing_page/signup/logout.jsx";
import Explore from "./landing_page/explore/stepindicator.jsx";
import ProductPage from "./landing_page/result/productpage.jsx";
import Wishlist from "./landing_page/wishlist/wish.jsx";

import axiosClient from "../config/axios.js";
import { getAccessToken } from "./utils/token.js";

function Root() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = getAccessToken();

    // If no access token, don't call auth/check
    if (!token) {
      setIsAuth(false);
      return;
    }

    axiosClient
      .get("/api/auth/check")
      .then((res) => {
        setIsAuth(res.data.authenticated);
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={<Signup setIsAuth={setIsAuth} />}
        />

        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} />}
        />

        <Route
          path="/logout"
          element={<Logout setIsAuth={setIsAuth} />}
        />

        <Route path="/explore" element={<Explore />} />
        <Route path="/results" element={<ProductPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Root />);