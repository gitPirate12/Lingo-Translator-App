import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import the useNavigate and useParams hooks
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook

function AddReply({ parentReplyId, onSuccess }) {
  const { postId ,} = useParams(); // Extract postId from URL params
  const navigate = useNavigate(); // Initialize navigate function from useNavigate
  console.log(postId, parentReplyId, onSuccess);
  const [comment, setComment] = useState('');
  const { isLoading, error } = useLogin(); // Get login status and error from the useLogin hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the user is logged in before adding a reply
      if (!localStorage.getItem('user')) {
        // If not logged in, return and display an error message
        console.error('User is not logged in');
        return;
      }

      // Get the authentication token from local storage
      const authToken = JSON.parse(localStorage.getItem('user')).token;

      // Send a POST request to add the reply with the authentication token
      const response = await axios.post('http://localhost:3040/api/replies', {
        comment,
        parentid: postId,
        parentReplyId
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Optionally, you can handle success or display a message
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error adding reply:', error);
      // Optionally, you can handle errors or display an error message
    }
  };

  const handleBack = () => {
    // Navigate back to the view post page
    navigate('/viewposts');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your reply here..."
          required
        ></textarea>
        <button type="submit" disabled={isLoading}>Submit Reply</button>
        {error && <div>Error: {error}</div>}
      </form>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default AddReply;
