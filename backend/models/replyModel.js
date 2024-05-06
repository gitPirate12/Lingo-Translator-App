const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    reply: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "DiscussionUser",
    },
    parentPost: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post",

    },
    parentReply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
    },
  
    upvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userInfoDetail",
    }],
    downvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userInfoDetail",
    }],

    nestedReplies: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
    }]

}, { timestamps: true });

// Middleware to remove deleted reply ID from the associated post's replies array
replySchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        const Post = mongoose.model('Post');
        try {
            // Remove the deleted reply ID from the associated post's replies array
            await Post.updateOne({ _id: doc.parentPost }, { $pull: { replies: doc._id } });
        } catch (error) {
            console.error('Error removing deleted reply ID from post:', error);
        }
        
        // If the deleted reply has a parent reply, remove its ID from the parent reply's nestedReplies array
        if (doc.parentReply) {
            const ParentReply = mongoose.model('Reply');
            try {
                // Remove the deleted reply ID from the parent reply's nestedReplies array
                await ParentReply.updateOne({ _id: doc.parentReply }, { $pull: { nestedReplies: doc._id } });
            } catch (error) {
                console.error('Error removing deleted reply ID from parent reply:', error);
            }
        }
        
        // Also remove the deleted reply from the nestedReplies array of its nested replies
        try {
            // Remove the deleted reply ID from the nestedReplies array of its nested replies
            await Reply.updateMany({ parentReply: doc._id }, { $pull: { parentReply: doc._id } });
        } catch (error) {
            console.error('Error removing nested reply ID from nested replies:', error);
        }
    }
});




module.exports = mongoose.model('Reply', replySchema);
