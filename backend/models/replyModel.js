const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    parentid: {
        type: Schema.Types.ObjectId, // Reference to the parent post
        ref: 'Post',
        required: true
    },
    username: {
        type: String, // Assuming the author is identified by a username
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: [{
        username: {
            type: String,
            required: true
        },
        commentID: {
            type: Schema.Types.ObjectId,
            required: true 
        },
        reply: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date().getTime()
        }
    }]
    
    
}, { timestamps: true });

module.exports = mongoose.model('Reply', replySchema);
