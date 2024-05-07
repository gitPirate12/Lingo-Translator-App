const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
    getReplies,
    getReply,
    createReply,
    deleteReply,
    updateReplyVoteCount ,
    getRepliesByPostId
} = require('../controllers/replyController');

const router = express.Router();

// Get all replies
router.get('/', getReplies);

// Get a single reply
router.get('/:id', getReply);

// Get  reply by post id
router.get('/post/:postId', getRepliesByPostId);

// Post a new reply
router.post('/:postId', requireAuth, createReply); // Applying requireAuth middleware

// Delete a reply
router.delete('/:id', requireAuth, deleteReply); // Applying requireAuth middleware

// Upvote reply
router.patch('/:id/upvote', requireAuth, updateReplyVoteCount);

// Downvote reply
router.patch('/:id/downvote', requireAuth, updateReplyVoteCount);

module.exports = router;
