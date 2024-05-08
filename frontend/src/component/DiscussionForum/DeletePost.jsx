import React from 'react';
import axios from 'axios';
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook

function DeletePost({ postId }) {
  const { login } = useLogin(); // Use the useLogin hook to handle user login

  const handleDelete = async () => {
    try {
      // Check if the user is logged in before deleting the post
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        // If user is not logged in, redirect to login page or display a message
        return;
      }

      // Attach the authentication token to the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Send DELETE request to delete the post
      await axios.delete(`http://localhost:3040/api/posts/${postId}`, config);
      
      // Optionally, you can handle success or display a message
      // Reload the page to fetch the latest data
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
      // Optionally, you can handle errors or display an error message
    }
  };

  return (
    <button onClick={handleDelete}>Delete Post</button>
  );
}

export default DeletePost;
