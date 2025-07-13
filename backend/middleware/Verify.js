const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'No token found' });

  jwt.verify(token, process.env.SUPER_SECRET_CODE, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken