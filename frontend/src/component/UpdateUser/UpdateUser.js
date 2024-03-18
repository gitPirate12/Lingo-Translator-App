import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const [error, setError] = useState('');

  const { email, password, confirmPassword, firstName, lastName } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();



    // Check if passwords match

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {

      // Make API request to update user
      const response = await axios.put('/api/users/update', {
        email,
        password,
        firstName,
        lastName
      });



      // Handle success response

      console.log('User updated successfully:', response.data);




      // Reset form and clear errors

      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      });
      setError('');
    } catch (err) {



      
      // Handle error response

      console.error('Update failed:', err.response.data.error);
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      {error && <div>{error}</div>}
      <form onSubmit={onSubmit}>
        <input type="password" placeholder="Confirm old Password" name="confirmPassword" value={confirmPassword} onChange={onChange} minLength="6" required />
        <input type="password" placeholder="New Password" name="password" value={password} onChange={onChange} minLength="6" required />
        <input type="text" placeholder="New First Name" name="firstName" value={firstName} onChange={onChange} required />
        <input type="text" placeholder="New Last Name" name="lastName" value={lastName} onChange={onChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
