import styles from "./signup.module.css";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../../firebase";
import axiosClient from "../../../config/axios";
import toast from "react-hot-toast";
import { setAccessToken } from "../../utils/token";

export default function Signup({ setIsAuth }) {
  const navigate = useNavigate();

  // ---------------- GOOGLE SIGNUP ----------------
  const handleGoogleSignup = async () => {
    try {
      const firebaseToken = await signInWithGoogle();

      const res = await axiosClient.post(
        "/api/auth/google",
        {},
        {
          headers: {
            Authorization: `Bearer ${firebaseToken}`,
          },
        }
      );

      setAccessToken(res.data.accessToken);
      setIsAuth(true);

      toast.success("Google signup successful 🎉");

      navigate("/explore");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Google signup failed"
      );
    }
  };

  // ---------------- NORMAL SIGNUP ----------------
  const handleSignup = async (e) => {
    e.preventDefault();

    const form = e.target;

    try {
      const res = await axiosClient.post("/api/auth/register", {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      });

      // Store access token
      setAccessToken(res.data.accessToken);

      // Update auth state
      setIsAuth(true);

      toast.success("Signup successful 🎉");

      navigate("/explore");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className={styles.signup_container}>
      <Navbar />

      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button type="submit">
          Sign Up
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Log In</Link>
      </p>

      <div className={styles.signup_div_google}>
        <button
          type="button"
          onClick={handleGoogleSignup}
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}