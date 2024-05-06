const express = require('express');
const {
    getposts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    upvotePost,
    downvotePost
} = require('../controllers/postController');

const router = express.Router();

// Get all posts
router.get('/', getposts);

// Get a single post
router.get('/:id', getPost);

// Post a new post
router.post('/', createPost);

// Delete a post
router.delete('/:id', deletePost);

// Update a post
router.patch('/:id', updatePost);

// Upvote a post
router.patch('/:id/upvote', upvotePost);

// Downvote a post
router.patch('/:id/downvote', downvotePost);

module.exports = router;
