import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      {/* Your dashboard content */}
      <Link to="/profile">View Profile</Link>
    </div>
  );
};

export default Dashboard;
