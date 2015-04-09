var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var seo = require('mean-seo');

var app = express();
// var models = require('./models');

app.use(require('cors')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('devnup-ws-bla-bla-random-str-829384'));

app.use(seo({
  cacheClient: 'disk', // Can be 'disk' or 'redis'
  // redisURL: 'redis://:password@hostname:port', // If using redis, optionally specify server credentials
  cacheDuration: 24 * 60 * 60 * 1000 // In milliseconds for disk cache
}));

// Public files
app.use('/', express.static(path.join(__dirname, '../lib')));

// API Routes
app.use('/api', require('./controllers'));

// catch API 404 and forward to error handler
app.use('/api', function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch 404 and forward to angular
app.use(function (req, res, next) {
  res.redirect('/#' + req.originalUrl);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      result: 'error',
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    result: 'error',
    message: err.message,
    error: {}
  });
});

// App public interface
module.exports = app;
