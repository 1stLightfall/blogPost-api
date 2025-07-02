// Import the Comment model
const Comment = require('../Comment');

// Import Mongoose for ObjectId validation
const mongoose = require('mongoose');

// Controller to create a new comment
exports.createComment = async (req, res) => {
    try {
        // Destructure required fields from the request body
        const { author, content, postId } = req.body;

        // Validate that author and postId are valid MongoDB ObjectIds
        if (!mongoose.Types.ObjectId.isValid(author) || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid author or postId' });
        }

        // Check if content is not empty
        if (!content || content.trim() === '') {
            return res.status(400).json({ message: 'Content cannot be empty' });
        }

        // Create a new comment instance
        const newComment = new Comment({ author, content, postId });

        // Save the comment to the database
        await newComment.save();

        // Respond with the newly created comment
        res.status(201).json(newComment);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Error creating comment', error });
    }
};

// Controller to fetch all comments for a specific post
exports.getCommentsByPost = async (req, res) => {
    try {
        // Extract postId from route parameters
        const { postId } = req.params;

        // Validate postId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid postId' });
        }

        // Find comments that belong to the post and are not marked as deleted
        const comments = await Comment.find({ postId, isDeleted: false });

        // Respond with the list of comments
        res.status(200).json(comments);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

// Controller to update an existing comment by ID
exports.updateComment = async (req, res) => {
    try {
        // Extract comment ID from route parameters
        const { id } = req.params;

        // Extract fields to be updated from request body
        const { author, content } = req.body;

        // Validate comment ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid comment ID' });
        }

        // Validate non-empty content
        if (!content || content.trim() === '') {
            return res.status(400).json({ message: 'Content cannot be empty' });
        }

        // Find comment by ID and update it
        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { author, content },
            { new: true } // Return the updated document
        );

        // If comment was not found, return 404
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Respond with the updated comment
        res.json(updatedComment);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Error updating comment', error });
    }
};

// Controller to soft delete a comment by setting isDeleted to true
exports.deleteComment = async (req, res) => {
    try {
        // Extract comment ID from route parameters
        const { id } = req.params;

        // Validate comment ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid comment ID' });
        }

        // Mark the comment as deleted instead of removing it from the database
        const deletedComment = await Comment.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true } // Return the updated document
        );

        // If comment was not found, return 404
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Respond with a success message and the soft-deleted comment
        res.json({ message: 'Comment deleted successfully', comment: deletedComment });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};
