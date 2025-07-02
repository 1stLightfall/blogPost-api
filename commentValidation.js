
// Import the Joi validation library for schema-based validation
const Joi = require('joi');

// Define the validation schema for a comment object
export const commentValidationSchema = Joi.object({

    // 'author' field must be a string and is required
    author: Joi.string()
        .required()
        .messages({
            "string.base": "Author must be a string",
            "any.required": "Author is required",
        }),

    // 'content' field must be a string and is required
    content: Joi.string()
        .required()
        .messages({
            "string.base": "Content must be a string",
            "string.empty": "Content cannot be empty",
            "any.required": "Content is required",
        }),

    // 'parentComment' is an optional field that must be a string or null
    parentComment: Joi.string()
        .allow(null)
        .messages({
            "string.base": "Parent Comment must be a string",
        }),

    // 'postId' field must be a string and is required
    postId: Joi.string()
        .required()
        .messages({
            "string.base": "Post ID must be a string",
            "any.required": "Post ID is required",
        }),
});

// Export the validation schema using CommonJS module syntax
module.exports = {
    commentValidationSchema,
};