import React, { useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook

function AddPost() {
  const { login } = useLogin(); // Use the useLogin hook to handle user login
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if the user is logged in before adding a post
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setError('You must be logged in to add a post');
        return;
      }

      // Send POST request to create a new post
      const response = await axios.post('http://localhost:3040/api/posts/', {
        question,
        description,
        tags: tags.split(',').map(tag => tag.trim()) // Convert comma-separated tags to an array
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}` // Attach the authentication token to the request headers
        }
      });

      // Log the response data
      console.log(response.data);

      // Clear form fields after successful submission
      setQuestion('');
      setDescription('');
      setTags('');

      // Redirect to ViewPosts page
      window.location.href = '/viewposts';
    } catch (error) {
      // Log any errors that occur during form submission
      console.error('Error submitting form:', error);
      setError(error.message || 'Error submitting form');
    }
  };

  return (
    <div>
      <h2>Add New Post</h2>
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <small>Separate tags with commas (e.g., tag1, tag2, tag3)</small>
        </div>
        <button type="submit">Submit</button>
        {/* Add button to redirect to ViewPosts page */}
        <button onClick={() => { window.location.href = '/viewposts' }}>Back</button>
      </form>
    </div>
  );
}

export default AddPost;
