import React from "react";
import styles from "./signup.module.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../../firebase";

const uri = import.meta.env.NEXT_BACKEND_URL || "http://localhost:5000";

const handleGoogleSignup = async () => {
  try {
    const token = await signInWithGoogle();

    await fetch(`${uri}/api/auth/google`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Google signup success");
  } catch (err) {
    console.error("Google signup failed", err);
  }
};

export default function Signup() {
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

      <Link to="/login">Log In</Link>

      <div className={styles.signup_div_google}>
        <button onClick={handleGoogleSignup}>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}
