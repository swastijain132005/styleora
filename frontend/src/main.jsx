import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './landing_page/home/homepage.jsx'
import Navbar from './landing_page/Navbar.jsx'
import Signup from './landing_page/signup/signup.jsx'
import Login from './landing_page/signup/login.jsx'
import Logout from './landing_page/signup/logout.jsx'
import Explore from './landing_page/explore/stepindicator.jsx'
import ProductPage from './landing_page/result/productpage.jsx'
import { Toaster } from 'react-hot-toast'
import axiosClient from '../config/axios.js'
import {useState,useEffect } from 'react'
import { setAccessToken } from './utils/token.js'

import { Routes, Route } from 'react-router-dom'

import React from 'react'
import App from './App.jsx'


function Root() {
 const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    axiosClient.get("/api/auth/check")
      .then(res => setIsAuth(res.data.authenticated))
      .catch(() => setIsAuth(false));
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

 <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/signup" element={<Signup  setIsAuth={setIsAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
        <Route path='/explore' element={<Explore />} />
        <Route path="/results" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}


createRoot(document.getElementById('root')).render(
  <Root />
);