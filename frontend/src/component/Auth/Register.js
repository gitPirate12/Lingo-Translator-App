import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    city: ''
  });

  const { email, password, firstName, lastName } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3040/api/auth/register", formData);
      alert('Registration successful:', response.data);
      console.log('Registration successful:', response.data);

    } catch (error) {
      alert( error.message);
    }
  };

  return (
    <div className="container">
      <div className="registration-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" value={firstName} onChange={handleChange} placeholder="First Name" required />
          <input type="text" name="lastName" value={lastName} onChange={handleChange} placeholder="Last Name" required />
          <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" minLength="6" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
