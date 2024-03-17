const express = require('express')
const {
    getReplies,
    createNestedReply,
    getReply,
    createReply,
    deleteReply,
    updateReply,
   
} = require('../controllers/replyController')


const router = express.Router()

// Get all repliess
router.get('/', getReplies)

// Get a single reply
router.get('/:id', getReply)

// Post a new reply
router.post('/', createReply)

// Post a reply to an existing reply (nested reply)
router.post('/:parentId/replies', createNestedReply);


// Delete a reply
router.delete('/:id', deleteReply)

// Update a reply
router.patch('/:id', updateReply)



module.exports = router