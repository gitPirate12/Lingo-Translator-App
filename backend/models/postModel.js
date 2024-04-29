const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userInfoDetail",
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
    }],
    upvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userInfoDetail",
    }],
    downvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userInfoDetail",
    }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);