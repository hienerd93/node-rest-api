const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const path = require('path');

const UserController = require(path.join(__dirname, 'user/UserController'));
app.use('/users', UserController);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
