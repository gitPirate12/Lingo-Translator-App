import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams hooks
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook

function EditPost() {
  const navigate = useNavigate(); // Initialize navigate function from useNavigate
  const { login } = useLogin(); // Use the useLogin hook to handle user login
  const { postId } = useParams(); // Extract postId from URL params

  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the post details when the component mounts
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3040/api/posts/${postId}`);
        const postData = response.data;
        // Set the post details in the state
        setQuestion(postData.question);
        setDescription(postData.description);
        setTags(postData.tags.join(', ')); // Convert tags array to string
      } catch (error) {
        console.error('Error fetching post details:', error);
        setError('Error fetching post details');
      }
    };

    fetchPostDetails();
  }, [postId]); // Fetch post details whenever postId changes

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if the user is logged in before updating the post
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

      // Send PATCH request to update the post
      const response = await axios.patch(`http://localhost:3040/api/posts/${postId}`, {
        question,
        description,
        tags: tags.split(',').map(tag => tag.trim()) // Convert comma-separated tags to an array
      }, config);

      // Log the response data
      console.log(response.data);

      // Optionally, you can handle success or display a message

      // Redirect to view post page after successful update
      navigate('/viewpost');
    } catch (error) {
      // Log any errors that occur during form submission
      console.error('Error updating post:', error);
      setError(error.message || 'Error updating post');
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={handleTagsChange}
          />
          <small>Separate tags with commas (e.g., tag1, tag2, tag3)</small>
        </div>
        <button type="submit">Save Changes</button>
      </form>
      {/* Button to go back to view post page */}
      <button onClick={() => navigate('/viewposts')}>Back</button>
    </div>
  );
}

export default EditPost;
