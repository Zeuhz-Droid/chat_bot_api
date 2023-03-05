const express = require('express');
const morgan = require('morgan');

const orderRouter = require('./routes/orderRoutes');

require('dotenv').config();

require('./database')();
const app = express();

// using morgan to log incoming requests' type, in the 'dev' environment
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

// using express library to gain access to body of request sent by clients
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/chatbot', orderRouter);

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find this route: (${req.originalUrl}) on this server.`,
  });
  next(
    new Error(`Can't find this route: (${req.originalUrl}) on this server.`)
  );
});

app.listen(process.env.PORT, () => {
  console.log(`listening successfully on PORT ${process.env.PORT}`);
});

module.exports = app;
