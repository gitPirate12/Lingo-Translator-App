const Reply = require('../models/replyModel')
const Post = require('../models/postModel');
const mongoose = require('mongoose')


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

 

// Create new reply 
const createReply = async (req, res) => {
    const { author, reply, parentPost, parentReply } = req.body;

    try {
        // Validate input data
        if (!author || !reply || !parentPost) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // Ensure that the parent post exists
        const existingPost = await Post.findById(parentPost);
        if (!existingPost) {
            return res.status(404).json({ error: "Parent post not found." });
        }

        // Create the reply document in the database
        const newReply = await Reply.create({ author, reply, parentPost });

        // If parentReply is provided, treat it as a nested reply
        if (parentReply) {
            // Ensure that the parent reply exists
            const existingParentReply = await Reply.findById(parentReply);
            if (!existingParentReply) {
                return res.status(404).json({ error: "Parent reply not found." });
            }

            // Update the parent reply to include the newly created nested reply
            existingParentReply.nestedReplies.push(newReply._id);
            await existingParentReply.save();
        }

        // Update the parent post to include the newly created reply
        existingPost.replies.push(newReply._id);
        await existingPost.save();

        res.status(201).json(newReply);
    } catch (error) {
        console.error('Error creating reply:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




const deleteReply = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the reply to delete
        const deletedReply = await Reply.findOneAndDelete({ _id: id });

        if (!deletedReply) {
            return res.status(404).json({ error: 'No such reply' });
        }

        // Remove the deleted reply from the nestedReplies array of its parent replies
        await Reply.updateMany(
            { nestedReplies: id },
            { $pull: { nestedReplies: id } }
        );

        res.status(200).json({ deletedReply });
    } catch (error) {
        console.error('Error deleting reply:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



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

// Function to upvote a reply
const upvoteReply = async (req, res) => {
    const { id } = req.params; // Extract reply ID from request parameters

    try {
        // Check if the received ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such reply' });
        }

        // Find the reply by ID and increment the upvote count
        const updatedReply = await Reply.findByIdAndUpdate(id, { $inc: { upvoteCount: 1 } }, { new: true });

        // If no reply is found with the provided ID, return a 404 error
        if (!updatedReply) {
            return res.status(404).json({ error: 'No such reply' });
        }

        // Return the updated reply with a 200 status
        res.status(200).json(updatedReply);
    } catch (error) {
        // If an error occurs during the execution of the function, return a 500 error
        console.error('Error upvoting reply:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to downvote a reply
const downvoteReply = async (req, res) => {
    const { id } = req.params; // Extract reply ID from request parameters

    try {
        // Check if the received ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such reply' });
        }

        // Find the reply by ID and decrement the downvote count
        const updatedReply = await Reply.findByIdAndUpdate(id, { $inc: { downvoteCount: 1 } }, { new: true });

        // If no reply is found with the provided ID, return a 404 error
        if (!updatedReply) {
            return res.status(404).json({ error: 'No such reply' });
        }

        // Return the updated reply with a 200 status
        res.status(200).json(updatedReply);
    } catch (error) {
        // If an error occurs during the execution of the function, return a 500 error
        console.error('Error downvoting reply:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {
    getReplies,
    getReply,
    createReply,
    deleteReply,
    updateReply,
    upvoteReply,
    downvoteReply
    
}