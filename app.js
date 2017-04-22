var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();


//Setting up browserSync
if (app.get('env') == 'development') {
  var browserSync = require('browser-sync');
  var config = {
    files: ["public/**/*.{js,css}", "views/**/*.ejs"],
    logLevel: 'info',
    logSnippet: false,
    reloadDelay: 3000,
    reloadOnRestart: true
  };
  var bs = browserSync(config);
  app.use(require('connect-browser-sync')(bs));
}


//Connecting to mongoDB
var MONGODB_URI="mongodb://admin:TykeTV123@ds149030.mlab.com:49030/tyketv_test";
var dbConnectionString = MONGODB_URI;
mongoose.connect(dbConnectionString);


// view engine setup
app.set('views', __dirname + '/views');
//app.engine('htm', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/users', users);
app.use('/', index);
app.use('/editaccount.htm', index);
app.use('/index.htm', index);
app.use('/signup.htm', index);
app.use('/signup-email.htm', index);
app.use('/history.htm*', index);
app.use('/kidhistory.htm', index);
app.use('/error.htm', index);
app.use('/success.htm', index);
app.use('/editaccountRetrieve.htm', index);
app.use('/signedout.htm', index);
app.use('/selectaccount.htm', index);
app.use('/selectaccount-load.htm', index);
app.use('/kidAge.htm', index);
app.use('/videos6to8.htm', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
