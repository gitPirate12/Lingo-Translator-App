import React from 'react';
import axios from 'axios';

function DeletePost({ postId }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3040/api/posts/${postId}`);
      // Optionally, you can handle success or display a message
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
