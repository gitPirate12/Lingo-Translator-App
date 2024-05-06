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
}, { timestamps: true });

module.exports = mongoose.model('Reply', replySchema);
