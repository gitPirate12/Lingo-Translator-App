const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    parentid: {
        type: Schema.Types.ObjectId, // Reference to the parent post
        ref: 'Post',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'userInfoDetail', // Reference to the user model collection
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    voteCount: {
        type: Number,
        default: 0
    },
    replies: [{
        parentReply: {
            type: Schema.Types.ObjectId,
            ref: 'Reply', // Reference to the parent reply within the same model
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'userInfoDetail', // Reference to the user model collection
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Reply', replySchema);
