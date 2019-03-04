const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean-angular6')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

const apiRouter = require('./routes/book');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/api', apiRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mean-angular6/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
