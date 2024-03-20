import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Header from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Swal from 'sweetalert2';

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

      const response = await axios.post("http://localhost:3040/api/auth/login", formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        redirectToProfile();
      }, 1000);

      console.log('Login successful:', response.data);

    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500
      });
      console.error('Login failed:', error.response.data);
      setFormData({ ...formData, password: '' });
    }
  };

  const redirectToProfile = () => {
    window.location.href = '/profile';
  };

  return (
    <div>
         <Header/>   
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Sign Up here</a></p>
      </div>
    </div>
    <div>
    </div>
    <Footer/>
    </div>
  );
};

export default Login;
