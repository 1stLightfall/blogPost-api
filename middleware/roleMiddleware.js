// Restrict access based on user role
module.exports = function (requiredRole) {
  return (req, res, next) => {
    // req.user was set by authMiddleware
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};
