import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ForumStyles.css';
import SearchPost from './SearchPost';
import AddPost from './AddPost';
import upvoteImage from './arrow-up.svg';
import downvoteImage from './arrow-down.svg';

const Forum = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await axios.get('http://localhost:3040/api/posts');
                setPosts(postsResponse.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const toggleReplies = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === postId ? { ...post, showReplies: !post.showReplies } : post
            )
        );
    };

    const toggleQuestion = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === postId ? { ...post, showReplies: false } : post
            )
        );
    };

    const handleUpvote = (postId) => {
        // Add your logic for upvoting here
    };

    const handleDownvote = (postId) => {
        // Add your logic for downvoting here
    };

    return (
        <div className="Forum">
            <div className="SearchPost">
                <SearchPost />
            </div>
            <div className="AddPost">
                <AddPost />
            </div>
            <h1>Forum</h1>
            <div className="posts">
                {posts.map(post => (
                    <div key={post._id} className="post">
                        <div className="question">
                            <div className="vote-buttons">
                                <button className="upvote-button" onClick={() => handleUpvote(post._id)}>
                                    <img src={upvoteImage} alt="Upvote" />
                                </button>
                                <span className="aggregate-vote-count">{post.upvotes - post.downvotes}</span>
                                <button className="downvote-button" onClick={() => handleDownvote(post._id)}>
                                    <img src={downvoteImage} alt="Downvote" />
                                </button>
                            </div>
                            <h2>{post.question}</h2>
                        </div>
                        <p>Posted by: {post.author.firstName} {post.author.lastName}</p>
                        {post.showReplies ? (
                            <>
                                <ul style={{ marginLeft: '20px' }}> {/* Indentation for replies */}
                                    {post.replies.map(reply => (
                                        <li key={reply._id} className="reply">
                                            <p>{reply.reply}</p>
                                            <p>Posted by: {reply.author.firstName} {reply.author.lastName}</p>
                                            {reply.nestedReplies && reply.nestedReplies.length > 0 && (
                                                <ul>
                                                    {reply.nestedReplies.map(nestedReply => (
                                                        <li key={nestedReply._id} className="nested-reply">
                                                            <p>{nestedReply.reply}</p>
                                                            <p>Posted by: {nestedReply.author.firstName} {nestedReply.author.lastName}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => toggleQuestion(post._id)}>Hide Comments</button>
                            </>
                        ) : (
                            <button onClick={() => toggleReplies(post._id)}>Show Comments</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;
