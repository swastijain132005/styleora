import React, { useState } from "react";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import toast from "react-hot-toast";
import { setAccessToken } from "../../utils/token";
import axiosClient from "../../../config/axios";

export default function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/api/auth/login", {
        email,
        password,
      });

      // Save access token
      setAccessToken(res.data.accessToken);

      // Update auth state
      setIsAuth(true);

      toast.success("Login successful 🎉");

      navigate("/explore");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Login failed"
      );
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
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}