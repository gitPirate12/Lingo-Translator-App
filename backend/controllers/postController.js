const Post = require('../models/postModel')
const Reply = require('../models/replyModel');
const mongoose = require('mongoose')

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate('author') // Populate the 'author' field of each post
            .populate({
                path: 'replies', // Populate the 'replies' field
                populate: {
                    path: 'author', // Populate the 'author' field of each reply
                    model: 'userinfodetails'
                }
            });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};









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

const createPost = async (req, res) => {
    try {
        // Extract necessary data from the request body
        const { question, author } = req.body;

        // Validate input data
        if (!question || !author) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // Create a new post document in the database
        const post = await Post.create({ question, author });

        // Respond with a success status code and the created post data
        return res.status(200).json({ message: "Post created successfully.", post });
    } catch (error) {
        // Handle errors by sending an appropriate error response
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};


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

// Upvote a post
const upvotePost = async (req, res) => {
    const { id } = req.params; // Post ID
    const { userId } = req.user; // User ID from the authenticated user
    
    try {
        const post = await Post.findById(id);
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        if (post.upvote.includes(userId)) {
            return res.status(400).json({ error: "You have already upvoted this post" });
        }
        
        // Remove user ID from downvote array if exists
        post.downvote.pull(userId);
        
        // Add user ID to upvote array
        post.upvote.push(userId);
        
        await post.save();
        
        res.status(200).json({ message: "Post upvoted successfully" });
    } catch (error) {
        console.error("Error upvoting post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Downvote a post
const downvotePost = async (req, res) => {
    const { id } = req.params; // Post ID
    const { userId } = req.user; // User ID from the authenticated user
    
    try {
        const post = await Post.findById(id);
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        if (post.downvote.includes(userId)) {
            return res.status(400).json({ error: "You have already downvoted this post" });
        }
        
        // Remove user ID from upvote array if exists
        post.upvote.pull(userId);
        
        // Add user ID to downvote array
        post.downvote.push(userId);
        
        await post.save();
        
        res.status(200).json({ message: "Post downvoted successfully" });
    } catch (error) {
        console.error("Error downvoting post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    upvotePost,
    downvotePost
   
}