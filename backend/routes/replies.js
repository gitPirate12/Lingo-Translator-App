const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
    getReplies,
    getReply,
    createReply,
    deleteReply,
    updateReply,
} = require('../controllers/replyController');

const router = express.Router();

// Get all replies
router.get('/', getReplies);

// Get a single reply
router.get('/:id', getReply);

// Post a new reply
router.post('/:postId/', requireAuth, createReply); // Applying requireAuth middleware

// Delete a reply
router.delete('/:id', requireAuth, deleteReply); // Applying requireAuth middleware

// Update a reply
router.patch('/:id', requireAuth, updateReply); // Applying requireAuth middleware

module.exports = router;
