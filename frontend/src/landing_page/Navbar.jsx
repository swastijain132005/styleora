import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
  <div className="container-fluid">
    <Link className={styles.heading} to="/">styleora</Link>

    <div className={styles.sidebar}>
      <ul>
        <li><Link className="nav-link" to="/">Home</Link></li>
        <li><Link className="nav-link" to="/signup">Signup</Link></li>
        <li><Link className="nav-link" to="/explore">Explore</Link></li>
        <li><Link className="nav-link" to="/wishlist">Wishlist</Link></li>
      </ul>
    </div>
  </div>
</nav>




     );
}

export default Navbar;



