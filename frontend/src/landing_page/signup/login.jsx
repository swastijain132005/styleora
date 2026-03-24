import React ,{useState} from 'react'
import styles from './signup.module.css'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
const uri = import.meta.env.NEXT_BACKEND_URL || "http://localhost:5000";



export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
      const response = await fetch(`${uri}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if(response.ok) {
        // Store token in localStorage or context
        localStorage.setItem('token', data.token);
        // Redirect to explore page
        Navigate('/explore');
      }

      
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div  className={styles.login_container}>
        <Navbar />
        <div className={styles.login_div}>
            <h2>Login</h2>
            <form>
                <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
            <p>
  Don't have an account? <Link to="/signup">Sign up</Link>
</p>

           
            </div>
    </div>
  )
}
