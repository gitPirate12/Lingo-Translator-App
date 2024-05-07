const Post = require('../models/postModel')
const mongoose = require('mongoose')



//get all posts
const getposts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



//get a single post
const getPost = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }
    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}

//create new post 

const createPost = async (req, res) =>{
    const {title, content} = req.body

    //add doc to db
    try {
        const post = await Post.create({title, content})
        res.status(200).json(post)
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}

//delete a post

const deletePost = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findOneAndDelete({_id: id})

    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}
//update a post
const updatePost = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}

const updatePostVoteCount = async (req, res) => {
    try {
        // Extract the post ID from the request parameters
        const { id } = req.params;
        // Extract the action (upvote or downvote) from the request body
        const { action } = req.body;

        // Check if the received ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such post' });
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
        const updatePostVoteCount = await Post.findByIdAndUpdate(
            id,// Post ID
            updateQuery,// Update query
            { new: true }// Return the updated post after the update operation
        );

        // If no post is found with the provided ID, return a 404 error
        if (!updatePostVoteCount) {
            return res.status(404).json({ error: 'No such post' });
        }

        // If the update operation is successful, return the updated post with a 200 status
        res.status(200).json(updatePostVoteCount);
    } catch (error) {
        // If an error occurs during the execution of the function, return a 500 error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getposts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    updatePostVoteCount
   
}