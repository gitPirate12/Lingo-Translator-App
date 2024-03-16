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
        type: Schema.Types.ObjectId, // Reference to the Reply model
        ref: 'Reply' // Name of the Reply model
    }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);