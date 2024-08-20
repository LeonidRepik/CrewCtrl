// import { body, validationResult } from 'express-validator';
const { body, validationResult } = require('express-validator');
const { BadRequestError } = require('../errors/customErrors.js');

// function that returns the errors
const withValidationErrors = (validateValues) => {
  return [
    validateValues,

    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        // return res.status(400).json({ errors: errorMessages });
        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required lol')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

module.exports = {
  validateLoginInput,
};
