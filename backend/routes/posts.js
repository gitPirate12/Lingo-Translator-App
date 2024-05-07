const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const express = require('express')
const {
    getposts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    updatePostVoteCount
} = require('../controllers/postController');

=======

const router = express.Router()

>>>>>>> main
// Get all posts
router.get('/', getposts)

// Get a single post
router.get('/:id', getPost)

// Post a new post
<<<<<<< HEAD
router.post('/', requireAuth, createPost); // Applying requireAuth middleware

// Delete a post
router.delete('/:id', requireAuth, deletePost); // Applying requireAuth middleware

// Update a post
router.patch('/:id', requireAuth, updatePost); // Applying requireAuth middleware

// UpdateVoteCount of a post
router.patch('/:id/vote', updatePostVoteCount);

module.exports = router;
=======
router.post('/', createPost)

// Delete a post
router.delete('/:id', deletePost)

// Update a post
router.patch('/:id', updatePost)

// UpdateVoteCount of a post
router.patch('/:id/vote', updatePostVoteCount)

module.exports = router
>>>>>>> main
