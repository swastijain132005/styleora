import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './landing_page/home/homepage.jsx'
import Navbar from './landing_page/Navbar.jsx'
import Signup from './landing_page/signup/signup.jsx'
import Login from './landing_page/signup/login.jsx'
import Explore from './landing_page/explore/stepindicator.jsx'

import { Routes, Route } from 'react-router-dom'

import React from 'react'
import App from './App.jsx'
import ProtectedRoute from './landing_page/protectedroute.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route path='/' element={<HomePage/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='/explore' element={<ProtectedRoute><Explore/></ProtectedRoute>}/>
     
      </Routes>
  </BrowserRouter>
)
