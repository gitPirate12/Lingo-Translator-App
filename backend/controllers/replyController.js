const Reply = require('../models/replyModel')
const mongoose = require('mongoose')


//get all replies
const getReplies = async (req, res) => {
    try {
        const replies = await Reply.find({}).sort({ createdAt: -1 });
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



//get a single reply
const getReply = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reply'})
    }
    const reply = await Reply.findById(id)

    if (!reply) {
        return res.status(404).json({error: 'No such reply'})
    }

    res.status(200).json(reply)
}

//create new reply 

const createReply = async (req, res) =>{
    const {author, content,parentPost} = req.body

    //add doc to db
    try {
        const reply = await Reply.create({author, content,parentPost})
        res.status(200).json(reply)
      } catch (error) {
        console.error('Error creating reply:', error);
        res.status(400).json({error: error.message})
        
      }
}

//delete a reply

const deleteReply = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reply'})
    }

    const reply = await Reply.findOneAndDelete({_id: id})

    if (!reply) {
        return res.status(404).json({error: 'No such reply'})
    }

    res.status(200).json(reply)
}
//update a reply
const updateReply = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reply'})
    }

    const reply = await Reply.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!reply) {
        return res.status(404).json({error: 'No such reply'})
    }

    res.status(200).json(reply)
}

const updateReplyVoteCount = async (req, res) => {
    try {
        // Extract the post ID from the request parameters
        const { id } = req.params;
        // Extract the action (upvote or downvote) from the request body
        const { action } = req.body;

        // Check if the received ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such reply' });
        }

        // Define an update query object
        let updateQuery = {};

        // Determine the action to be performed based on the request body
        if (action === 'upvote') {
            // If the action is upvote, increment the voteCount by 1
            updateQuery = { $inc: { voteCount: 1 } };
        } else if (action === 'downvote') {
            // If the action is downvote, decrement the voteCount by 1
            updateQuery = { $inc: { voteCount: -1 } };
        } else {
            // If the action is neither upvote nor downvote, return a 400 error
            return res.status(400).json({ error: 'Invalid action' });
        }

        // Ensure voteCount never goes below 0
        updateQuery.$min = { voteCount: 0 };

        // Find and update the post in the database based on the provided ID and update query
        const updateReplyVoteCount = await Reply.findByIdAndUpdate(
            id,// Post ID
            updateQuery,// Update query
            { new: true }// Return the updated post after the update operation
        );

        // If no post is found with the provided ID, return a 404 error
        if (!updateReplyVoteCount) {
            return res.status(404).json({ error: 'No such reply' });
        }

        // If the update operation is successful, return the updated post with a 200 status
        res.status(200).json(updateReplyVoteCount);
    } catch (error) {
        // If an error occurs during the execution of the function, return a 500 error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getReplies,
    getReply,
    createReply,
    deleteReply,
    updateReply,
    updateReplyVoteCount
}