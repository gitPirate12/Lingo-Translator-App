import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewPosts.css';
import DeletePost from './DeletePost';
import HandleVote from './HandleVote';
import DeleteReply from './DeleteReply';
import EditReply from './EditReply';
import GenerateReport from './GenerateReport'; // Import the GenerateReport component
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [editReplyId, setEditReplyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isLoading, error: loginError } = useLogin(); // Use the useLogin hook to handle user login

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3040/api/posts/');
      const updatedPosts = await Promise.all(response.data.map(async post => {
        try {
          const authorInfo = await axios.get(`http://localhost:3040/api/users/${post.author}`);
          const repliesResponse = await axios.get(`http://localhost:3040/api/replies/post/${post._id}`);
          const replies = repliesResponse.data;
          return {
            ...post,
            author: `${authorInfo.data.firstName} ${authorInfo.data.lastName}`,
            replies: replies
          };
        } catch (error) {
          console.error('Error fetching author info:', error);
          return post;
        }
      }));
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message || 'Error fetching posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3040/api/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/editpost/${postId}`);
  };

  const handleAddReply = (postId) => {
    navigate(`/addreply/${postId}`);
  };

  const handleEditReply = (replyId) => {
    setEditReplyId(replyId);
  };

  const handleVoteReply = async (replyId, voteType) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token; // Extract token from localStorage

      // Check if token exists
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.patch(`http://localhost:3040/api/replies/${replyId}/${voteType}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        fetchPosts(); // Fetch posts again to update UI after voting
      } else {
        throw new Error('Failed to vote on reply');
      }
    } catch (error) {
      console.error('Error voting on reply:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      const filtered = posts.filter(post =>
        post.author.toLowerCase().includes(query.toLowerCase()) ||
        post.question.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-posts-container">
      <div>
        <h1>Discussion forum</h1>
      </div>
      <div className="button-container">
        <button className="add-post-button" onClick={() => navigate('/addpost')}>
          Add Post
        </button>
        <GenerateReport /> {/* Render the GenerateReport component */}
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="posts-list">
        {(searchQuery.trim() === '' ? posts : filteredPosts).map(post => (
          <div key={post._id} className="post-item">
            <h3>{post.question}</h3>
            <p>{post.description}</p>
            <p>Author: {post.author}</p>
            <p>Tags: {post.tags.join(', ')}</p>
            <p>Vote Count: {post.voteCount}</p>
            <HandleVote postId={post._id} type="up" />
            <HandleVote postId={post._id} type="down" />
            <button className="action-button" onClick={() => handleEditPost(post._id)}>
              Edit
            </button>
            <DeletePost postId={post._id} onDelete={() => handleDeletePost(post._id)} />
            <button onClick={() => handleAddReply(post._id)}>Add Reply</button>
            <h4>Replies:</h4>
            <ul>
              {post.replies.map(reply => (
                <li key={reply._id}>
                  <p>{reply.author.firstName} {reply.author.lastName}: {reply.comment}</p>
                  <p>Vote Count: {reply.voteCount}</p>
                  <DeleteReply replyId={reply._id} />
                  <button onClick={() => handleEditReply(reply._id)}>Edit Reply</button>
                  {editReplyId === reply._id && <EditReply replyId={reply._id} />}
                  <button onClick={() => handleVoteReply(reply._id, 'upvote')}>Upvote Reply</button>
                  <button onClick={() => handleVoteReply(reply._id, 'downvote')}>Downvote Reply</button>
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPosts;
