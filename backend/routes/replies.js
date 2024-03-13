const express = require('express')
const {
    getReplies,
    getReply,
    createReply,
    deleteReply,
    updateReply,
    updateReplyVoteCount
} = require('../controllers/replyController')


const router = express.Router()

// Get all repliess
router.get('/', getReplies)

// Get a single reply
router.get('/:id', getReply)

// Post a new reply
router.post('/', createReply)

// Delete a reply
router.delete('/:id', deleteReply)

// Update a reply
router.patch('/:id', updateReply)

// UpdatereplyVoteCount of a reply
router.patch('/:id/vote', updateReplyVoteCount)

module.exports = router