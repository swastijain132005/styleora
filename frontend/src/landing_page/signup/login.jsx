import React from 'react'
import styles from './signup.module.css'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

export default function login() {
  return (
    <div  className={styles.login_container}>
        <Navbar />
        <div className={styles.login_div}>
            <h2>Login</h2>
            <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Log In</button>
            </form>
            <p>
  Don't have an account? <Link to="/signup">Sign up</Link>
</p>

           
            </div>
    </div>
  )
}
