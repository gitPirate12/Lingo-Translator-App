import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    city: ''
  });

  const { email, password, firstName, lastName, city } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3040/api/auth/register", formData);
      setFormData({ ...formData, password: '', email: '', firstName: '', lastName: '', city: '' });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        redirectToLogin();
      }, 1000);

      console.log('Registration successful:', response.data);

    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Registration failed",
        showConfirmButton: false,
        timer: 1500
      })
      console.log("Registration failed")
    }
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="registration-form">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={firstName} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={lastName} onChange={handleChange} placeholder="Last Name" required />
            <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" minLength="6" required />
            <input type="text" name="city" value={city} onChange={handleChange} placeholder="City" required />
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <a href="/login">Login Here</a></p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
