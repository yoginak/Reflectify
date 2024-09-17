import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please enter a valid password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      const { token, userId } = response.data;
      saveToken(token, userId);
      navigate("/moods");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({
          general: "Error logging in. Please check your credentials.",
        });
      }
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Sign In</h1>
          <div className="card p-4">            
            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>            
            <div className="form-group mb-3">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            {errors.general && (
              <div className="alert alert-danger" role="alert">
                {errors.general}
              </div>
            )}
            <button className="btn btn-primary w-100" onClick={handleLogin}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
