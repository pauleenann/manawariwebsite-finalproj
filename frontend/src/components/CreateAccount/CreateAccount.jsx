import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccount = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  // State variables for validation errors
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate the form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      // Display validation errors
      setValidationErrors(errors);
      return;
    }

    // If the form is valid, proceed with account creation
    try {
      const response = await axios.post("http://localhost:8800/create-user", user);
      // Assuming the server returns a token upon successful account creation
      const { token, userId } = response.data;

      // Store the token in your preferred way (e.g., localStorage, cookies, state management)
      localStorage.setItem('token', token);

      // Optionally, you may also store the user ID
      localStorage.setItem('userId', userId);

      // Redirect to the desired page (e.g., dashboard, home)
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  // Function to validate the form
  const validateForm = () => {
    const errors = {};

    // Example: Check for a minimum password length
    const minPasswordLength = 8;
    if (user.password.length < minPasswordLength) {
      errors.password = `Password must be at least ${minPasswordLength} characters long`;
    }

    // Example: Check for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      errors.email = "Invalid email format";
    }

    // Example: Check for a valid username format
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const minUsernameLength = 3;
    if (!usernameRegex.test(user.username) || user.username.length < minUsernameLength) {
      errors.username = `Invalid username format. Must be at least ${minUsernameLength} characters long and contain only letters, numbers, and underscores.`;
    }

    // Check if passwords match
    if (user.password !== user.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="register-main">
      <div className="register">
        <div className="container">
          <h3>Create an account</h3>
          <p>
            Please provide your essential details for Manawari's registration
            form to unlock a world of opportunities and personalized experiences
            tailored just for you.
          </p>
          <form action="">
            <input type="text" onChange={handleChange} placeholder="First Name" name="fname" />
            {/* Display validation error for the 'fname' field */}
            {validationErrors.fname && <p className="error">{validationErrors.fname}</p>}
            <input type="text" onChange={handleChange} placeholder="Last Name" name="lname" />
            {/* Display validation error for the 'lname' field */}
            {validationErrors.lname && <p className="error">{validationErrors.lname}</p>}
            <input type="text" onChange={handleChange} placeholder="Username" name="username" />
            {/* Display validation error for the 'username' field */}
            {validationErrors.username && <p className="error">{validationErrors.username}</p>}
            <input type="email" onChange={handleChange} placeholder="Email" name="email" />
            {/* Display validation error for the 'email' field */}
            {validationErrors.email && <p className="error">{validationErrors.email}</p>}
            <input type="password" onChange={handleChange} placeholder="Password" name="password" />
            {/* Display validation error for the 'password' field */}
            {validationErrors.password && <p className="error">{validationErrors.password}</p>}
            <input type="password" onChange={handleChange} placeholder="Confirm Password" name="confirm_password" />
            {/* Display validation error for the 'confirm_password' field */}
            {validationErrors.confirm_password && <p className="error">{validationErrors.confirm_password}</p>}
            <button type="submit" className='create-account-register-button' onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
