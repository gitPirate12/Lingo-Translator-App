const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
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
    replies: [{
        type: String // You can change this to an object if each reply has more properties
    }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
