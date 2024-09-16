import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  // Function to validate form
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
      navigate('/auth/login'); // Redirect to login after successful registration
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ general: error.response.data.message }); // Set general error message
      } else {
        setErrors({ general: 'Error registering user. Please try again.' });
      }
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {errors.general && <div style={{ color: 'red' }}>{errors.general}</div>}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small>Must be at least 8 characters long, include one capital letter and one symbol.</small>
        {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <small style={{ color: 'red' }}>{errors.confirmPassword}</small>}
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
