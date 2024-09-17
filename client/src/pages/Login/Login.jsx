import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; 
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { saveToken } = useAuth(); 
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8080/auth/login', {
          email,
          password
        });
        const { token, userId } = response.data;
        saveToken(token, userId); 
        console.log(response.data)
        navigate('/moods'); 
      } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
      }
    };
  
    return (
      <div>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };
  