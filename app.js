const express = require('express');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const mainPageRouter = require('./routes/mainPageRoutes');
const createFlight = require('./routes/createFlightRoutes');
const crewRouter = require('./routes/crewRoutes');

var cors = require('cors');

const app = express();

app.use(cors());
// 1) MIDDLEWARES
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware.js');

app.use(express.json());
app.use(morgan('dev'));
// app.use(errorHandlerMiddleware);
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log('Hello from the middle ware😁');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

app.use('/api/v1/test', mainPageRouter);
app.use('/api/v1/flights', createFlight);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/crew', crewRouter);

// Aidar's code for deployment - START
let path = require('path');
app.use(express.static(path.resolve(__dirname, './frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/dist', 'index.html'));
});
// Aidar's code for deployment - END

module.exports = app;
