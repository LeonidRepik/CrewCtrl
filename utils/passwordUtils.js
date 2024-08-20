const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function for comparing (hashed) passwords
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

// Creating a JSON Web Token
const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// Verifying a JSON Web Token
const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = {
  comparePassword,
  createJWT,
  verifyJWT,
};
