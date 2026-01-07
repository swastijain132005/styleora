import React from 'react'
import styles from './signup.module.css'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'


export default function signup() {
  return (
    <div className={styles.signup_container}>
      <Navbar />
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? Log in</p>
  <Link
  to="/login"
  style={{
    display: "inline",
    padding: "0.5rem 1.5rem",
    backgroundColor: "#e46aa3",
    color: "#ffffff",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    textAlign: "center",
    cursor: "pointer"
  }}
>
  Log In
</Link>
        <div className={styles.signup_div_google}>
            <button>Sign Up with Google </button>
            <image src="images/google.avif" alt="google_logo" />
        </div>
    </div>
  )
}
