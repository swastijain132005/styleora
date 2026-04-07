import React, { useState } from 'react';
import styles from './signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import toast from 'react-hot-toast';

const uri = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function Login() { // ✅ capital L
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${uri}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      toast.success("Login success");

      // ✅ store access token
      setAccessToken(data.accessToken);

      console.log("Login success");

      navigate("/explore");

    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className={styles.login_container}>
      <Navbar />

      <div className={styles.login_div}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className={styles.login_form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}