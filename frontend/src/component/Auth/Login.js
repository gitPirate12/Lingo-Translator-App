import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try {

      const response = await axios.post('/api/auth/login', formData);
      console.log('Login successful:', response.data);

    } catch (error) {
      console.error('Login failed:', error.response.data);
      setFormData({ ...formData, password: '' });
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
