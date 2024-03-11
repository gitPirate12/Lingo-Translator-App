const express = require('express')
const {
    getposts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    updatePostVoteCount
} = require('../controllers/postController')

const router = express.Router()

// Get all posts
router.get('/', getposts)

// Get a single post
router.get('/:id', getPost)

// Post a new post
router.post('/', createPost)

// Delete a post
router.delete('/:id', deletePost)

// Update a post
router.patch('/:id', updatePost)

// UpdateVoteCount of a post
router.patch('/:id/vote', updatePostVoteCount)

module.exports = router
