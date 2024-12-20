require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();

const mainRouter= require('./routes/main');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public')); //this is where our front end files are
app.use(express.json()); //as we need to access req.body

app.use('/api/v1', mainRouter); //so will be /api/v1/dashboard and /api/v1/log

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
