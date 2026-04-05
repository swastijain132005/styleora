import styles from "./signup.module.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../../firebase";
import { setAccessToken } from "../../utils/token"; // ✅ ADD THIS

const uri = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const handleGoogleSignup = async () => {
  try {
    const token = await signInWithGoogle();

    const res = await fetch(`${uri}/api/auth/google`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Important for sending cookies
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    setAccessToken(data.accessToken); // ✅ STORE ACCESS TOKEN


    console.log(data);
    console.log("Google signup success");
  } catch (err) {
    console.error("Google signup failed", err);
  }
};

export default function Signup() {

  const handlesignup = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch(`${uri}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      console.log(data);
      console.log("Signup success");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className={styles.signup_container}>
      <Navbar />
      <h1>Sign Up</h1>

      <form onSubmit={handlesignup}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">
          Sign Up
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          Log In
        </Link>
      </p>

      <div className={styles.signup_div_google}>
        <button type="button" onClick={handleGoogleSignup}>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}