const jwt = require('jsonwebtoken');

// Sign token for user login
exports.generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: '1d' });

// Verify token to check if current user is valid
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    return null;
  }
};
