import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ViewPosts.css'; // Import CSS file for styles
import DeletePost from './DeletePost'; // Import DeletePost component

function ViewPosts() {
  // State to store the fetched posts
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function from useNavigate

  // Function to fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3040/api/posts/');
      const updatedPosts = await Promise.all(response.data.map(async post => {
        // Fetch author information using the author's ID
        try {
          const authorInfo = await axios.get(`http://localhost:3040/api/users/${post.author}`);
          
          // Fetch replies for the current post
          const repliesResponse = await axios.get(`http://localhost:3040/api/replies/post/${post._id}`);
          const replies = repliesResponse.data;
          
          return {
            ...post,
            author: `${authorInfo.data.firstName} ${authorInfo.data.lastName}`, // Combine first and last name
            replies: replies // Include replies in post object
          };
        } catch (error) {
          console.error('Error fetching author info:', error);
          return post; // Keep original post if author info cannot be fetched
        }
      }));
      setPosts(updatedPosts); // Set the fetched posts in state
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message || 'Error fetching posts');
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3040/api/posts/${postId}`);
      // Optionally, you can handle success or display a message
      fetchPosts(); // Fetch posts again to update the list after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      // Optionally, you can handle errors or display an error message
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-posts-container">
      {/* Use a button for Add Post */}
      <button className="add-post-button" onClick={() => navigate('/addpost')}>Add Post</button>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post._id} className="post-item">
            <h3>{post.question}</h3>
            <p>{post.description}</p>
            <p>Author: {post.author}</p>
            <p>Tags: {post.tags.join(', ')}</p>
            <p>Vote Count: {post.voteCount}</p>
            {/* Render replies */}
            <h4>Replies:</h4>
            <ul>
              {post.replies.map(reply => (
                <li key={reply._id}>
                  {/* Concatenate reply author's name with comment */}
                  <p>{reply.author.firstName} {reply.author.lastName}: {reply.comment}</p>
                </li>
              ))}
            </ul>
            {/* Add buttons for voting, editing, and deleting */}
            <button className="action-button">Vote Up</button>
            <button className="action-button">Vote Down</button>
            <button className="action-button">Edit</button>
            {/* Use DeletePost component for deleting */}
            <DeletePost postId={post._id} onDelete={() => handleDelete(post._id)} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPosts;
