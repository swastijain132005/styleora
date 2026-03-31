import styles from "./signup.module.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../../firebase";

const uri = import.meta.env.NEXT_BACKEND_URL || "http://localhost:3000";

const handleGoogleSignup = async () => {
  try {
    const token = await signInWithGoogle();

    const res=await fetch(`${uri}/api/auth/google`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);

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

      <p>Already have an account? <Link to="/login" style={{ textDecoration: "none" }}>Log In</Link>
 </p>

     
      <div className={styles.signup_div_google}>
        <button type="button" onClick={handleGoogleSignup}>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
} 
