/*import React, { useState, useEffect } from 'react';                 //  not completed yet
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3040/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.city}</p>
    </div>
  );
};

export default Profile;
*/

import React from 'react';

const Profile = () => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Content will be available soon</p>
    </div>
  );
};

export default Profile;
