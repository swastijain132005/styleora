import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import axiosClient from '../../config/axios';
import { useState, useEffect } from 'react';


function Navbar({isAuth, setIsAuth}) {

   

  

    const handleLogout = async () => {
    try {
      await axiosClient.post("/api/auth/logout"); // backend should clear cookie
      setIsAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
  <div className="container-fluid">
    <Link className={styles.heading} to="/">styleora</Link>

    <div className={styles.sidebar}>
      <ul>
        <li><Link className="nav-link" to="/">Home</Link></li>
         <li>
              {isAuth ? (
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link className="nav-link" to="/signup">Signup</Link>
              )}
            </li>
        <li><Link className="nav-link" to="/explore">Explore</Link></li>
        <li><Link className="nav-link" to="/wishlist">Wishlist</Link></li>
      </ul>
    </div>
  </div>
</nav>




     );
}

export default Navbar;



