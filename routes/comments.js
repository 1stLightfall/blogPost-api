// Import the Express framework
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the comment controller functions
const commentController = require('../controllers/commentController');

// Import the middleware to validate comment data
const validateComment = require('../commentMiddleware');

// Route to create a new comment
router.post('/', validateComment, commentController.createComment);

// Route to get all comments associated with a specific post
router.get('/post/:postId', commentController.getCommentsByPost);

// Route to update an existing comment by ID
router.put('/:id', validateComment, commentController.updateComment);

// Route to delete a comment by ID
router.delete('/:id', commentController.deleteComment);

// Export the router to be used in the main app
module.exports = router;
