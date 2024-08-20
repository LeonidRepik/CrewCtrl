const { UnauthenticatedError } = require('../errors/customErrors.js');
const { verifyJWT } = require('../utils/passwordUtils.js');

const authenticateUser = async (req, res, next) => {
  // Destructuring the token
  const { token } = req.cookies;

  // Throwing an error if token does not exist
  if (!token) {
    throw new UnauthenticatedError('authentication failed');
  }

  // Passing to the next middleware ONLY if JWT was verified:
  try {
    // Destructuring the User ID
    const { userId } = verifyJWT(token);

    // Attaching the User ID to the request:
    req.user = { userId };

    // Passing to the next middleware
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication failed');
  }
};

module.exports = {
  authenticateUser,
};
