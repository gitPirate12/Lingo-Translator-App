const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    author: {
        type: String, // Assuming the author is identified by a username
        required: true
    },
    content: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    repliesTo: {
        type: Schema.Types.ObjectId, // Reference to the parent reply (if applicable)
        ref: 'Reply'
    },
    parentPost: {
        type: Schema.Types.ObjectId, // Reference to the parent post
        ref: 'Post',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Reply', replySchema);