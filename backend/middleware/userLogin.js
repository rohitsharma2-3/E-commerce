const requireLogin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Please login first' });
  next();
};

module.exports = requireLogin