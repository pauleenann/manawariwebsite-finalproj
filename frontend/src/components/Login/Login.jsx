import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/login', user);
      const loggedIn = 'true';
      localStorage.setItem('isLoggedIn', loggedIn);
      localStorage.setItem('email', user.email);
  
      // Additional information you might want to save in local storage
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('category', response.data.category);
  
      // Check the user's category and redirect accordingly
      if (response.data.category === 'admin') {
        // Redirect to the admin page
        navigate('/admin');
      } else {
        // If the category is not available in the response, redirect to the regular user page
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Unauthorized - Invalid email/password
        setError('Invalid email or password');
      } else {
        // Other errors
        setError('An error occurred. Please try again later.');
      }
      console.error(err);
    }
  };
  
  
  return (
    <div className="container-main">
      <div className="container">
        <div className="sign-in">
          <h3>Sign in</h3>
          <p>Sign in to your Manawari account</p>
          <form action="">
            <input onChange={handleChange} name="email" type="email" placeholder="Email" />
            <input onChange={handleChange} name="password" type="password" placeholder="Password" />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleClick} className="sign-in-button">
              Sign in
            </button>
            <a href="">Forgot your password?</a>
          </form>
        </div>
        <div className="create">
          <h3>Create an account</h3>
          <p>
            Get started with Manawari by creating your account — your gateway to exclusive features, personalized
            content, and a seamless experience tailored to your needs.
          </p>
          <Link to="/create-account">
            <button className="register-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
