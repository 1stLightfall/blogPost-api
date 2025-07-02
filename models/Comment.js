// Import Mongoose to define the schema
const mongoose = require('mongoose');

// Define the schema for the Comment model
const commentSchema = new mongoose.Schema({

    // ID of the user who wrote the comment
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    // Text content of the comment
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },

    // Optional ID of the parent comment (for nested replies)
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },

    // ID of the post this comment belongs to
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },

    // Timestamp when the comment was created
    createdAt: {
        type: Date,
        default: Date.now
    },

    // Flag to indicate soft deletion
    isDeleted: {
        type: Boolean,
        default: false
    }
});

// Export the Comment model
module.exports = mongoose.model('Comment', commentSchema);
