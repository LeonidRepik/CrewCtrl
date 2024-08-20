const User = require('../models/userModule');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { UnauthenticatedError } = require('../errors/customErrors.js');

const {
  comparePassword,
  createJWT,
  verifyJWT,
} = require('../utils/passwordUtils.js');

exports.singUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Checking if an email exists:
    const user = await User.findOne({ email: req.body.email });

    // If the user does not exist (null):
    if (!user) throw new UnauthenticatedError('email does not exist');

    // Comparing (encrypted passwords):
    const passwordMatches = await comparePassword(
      req.body.password,
      user.password
    );

    // If passwords don't match:
    if (!passwordMatches)
      throw new UnauthenticatedError('password is incorrect');

    // Setting up the JSON Web Token
    const token = createJWT({
      userId: user._id,
    });

    // One day in milliseconds
    // 1. 1 second = 1000 ms
    // 2. multiplying 1 second (1000) by 60 = 1 minute
    // 3. 1 minute multiplied by 60 = 1 hour
    // 4. 1 hour multiplied by 24 = 1 day
    const oneDay = 1000 * 60 * 60 * 24;

    // Creating an HTTP Cookie
    res.cookie('token', token, {
      httOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });

    // res.json({ token: token });
    res.status(StatusCodes.OK).json({ msg: 'user logged in' });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Login error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Login Failed',
    });
  }

  // const { email, password } = req.body;
  // //1) IF EMAIL EXISTS AND PASSWORD
  // if (!email || !password) {
  //   res.status(400).json({
  //     status: 'error',
  //     message: 'Please provide an email and password',
  //   });
  // }
  //2)USER EXISTS AND PASSWORD IS CORRECT
  // 3) IF OK SEND TOKEN BACK
};

exports.logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};
