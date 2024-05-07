import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewPosts.css'; // Import CSS file for styles

function ViewPosts() {
  // State to store the fetched posts
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3040/api/posts/');
      const updatedPosts = await Promise.all(response.data.map(async post => {
        // Fetch author information using the author's ID
        try {
          const authorInfo = await axios.get(`http://localhost:3040/api/users/${post.author}`);
          console.log( 'the post')
          console.log( post._id)
          // Fetch replies for the current post
          const repliesResponse = await axios.get(`http://localhost:3040/api/replies/post/${post._id}`);
          console.log( repliesResponse.data)
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-posts-container">
      <h1>View Posts</h1>
      {/* Render each post */}
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
                <li key={reply._id}>{reply.comment}</li>
              ))}
            </ul>
            {/* Add buttons for voting, editing, and deleting */}
            <button>Vote Up</button>
            <button>Vote Down</button>
            <button>Edit</button>
            <button>Delete</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPosts;
