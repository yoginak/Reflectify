import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SignUp.scss"

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

   const validateForm = () => {
    const newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long, include one capital letter and one symbol.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('http://localhost:8080/auth/register', {
        name: username,
        email,
        password,
        confirmPassword
      });
      navigate('/auth/login'); 
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Error registering user. Please try again.' });
      }
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      
      
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <span className="tooltip" data-tooltip="Passwords must contain atleast 8 characters, one capital letter and a symbol(!@#$%^&*)"> ? </span> */}
        
        {/* <small>Must be at least 8 characters long, include one capital letter and one symbol.</small> */}
        {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
      </div>
      
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <small style={{ color: 'red' }}>{errors.confirmPassword}</small>}
      </div>
      
      <button onClick={handleRegister}>Register</button>
      {errors.general && <div style={{ color: 'red' }}>{errors.general}</div>}
    </div>
  );
}
