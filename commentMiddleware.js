const Joi = require('joi');

// Import the comment validation schema
const { commentValidationSchema } = require('./commentValidation');

// Middleware function to validate comment data from the request body
const validateComment = (req, res, next) => {
  // Validate the request body against the schema
  const { error } = commentValidationSchema.validate(req.body);

  // If validation fails, return a 400 response with the error message
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
};

// Export the validation middleware
module.exports = validateComment;
