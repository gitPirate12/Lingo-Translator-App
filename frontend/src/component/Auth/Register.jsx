import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const { email, password, firstName, lastName } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', formData);
      console.log('Registration successful:', response.data);

    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '30px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={firstName} onChange={handleChange} placeholder="First Name" required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box' }} />
        <input type="text" name="lastName" value={lastName} onChange={handleChange} placeholder="Last Name" required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box' }} />
        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box' }} />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" minLength="6" required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '3px', boxSizing: 'border-box' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
};

export default Register;