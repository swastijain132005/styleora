import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './landing_page/home/homepage.jsx'
import Navbar from './landing_page/Navbar.jsx'
import Signup from './landing_page/signup/signup.jsx'
import Login from './landing_page/signup/login.jsx'
import Explore from './landing_page/explore/stepindicator.jsx'
import { Toaster } from 'react-hot-toast'

import { Routes, Route } from 'react-router-dom'

import React from 'react'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
    <Routes>

      <Route path='/' element={<HomePage/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='/explore' element={<Explore/>}/>
     
      </Routes>
  </BrowserRouter>
)
