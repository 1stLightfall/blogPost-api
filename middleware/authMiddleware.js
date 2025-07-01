const jwt = require('jsonwebtoken');

// Protect routes: checks for valid JWT
module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.headers.authorization;

  // Check if not token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Get token string (after 'Bearer ')
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user payload to request (so next middleware or route has access)
    req.user = decoded;

    // Move on to the next middleware/route handler
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
