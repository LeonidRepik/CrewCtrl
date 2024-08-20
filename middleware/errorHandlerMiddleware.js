// import { StatusCodes } from 'http-status-codes';
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const msg = err.message || `Oops, something went wrong`;

  res.status(statusCode).json({ msg });
};

// export default errorHandlerMiddleware;
module.exports = {
  errorHandlerMiddleware,
};
