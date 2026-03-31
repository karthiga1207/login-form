import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    
    // Email Validation: Must contain @, ., and a domain like .com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      tempErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      tempErrors.email = "Must contain '@', '.', and a valid domain (e.g., .com)";
    }

    // Password Validation: 8 chars, 1 number, 1 special char
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    
    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long.";
    } else if (!hasNumber.test(password)) {
      tempErrors.password = "Password must include at least one number.";
    } else if (!hasSpecialChar.test(password)) {
      tempErrors.password = "Password must include at least one special character.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Success! You are logged in.");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        
        <div className="input-group">
          <label htmlFor="email">Email or Username</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default App;