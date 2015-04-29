// a lot of this si auto-generated by express, and
// some of it we don't use (we don't do anything real with the logger)

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// routes
var routes = require('./routes/index');
var company = require('./routes/company');
var title = require('./routes/title');

var app = express();
app.set('models', require('./models'));

app.get('models').sequelize.sync();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// of course this key should be changed!
// also, in a production environment we should probably use redis or
// similar to store session data, otherwise if we restart the app
// this is lost!
app.use(
  session({
    secret: 'super_secret_key',
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/company', company);
app.use('/title/', title);

// the below is auto-generated by express
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
