var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var models = require('./models');

// method override is to support delete and put forms.
var methodOverride = require('method-override');


var app = express();

// I do this just for ease of use, you wouldn't want this here normally!
//models.sequelize.sync();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setting this so if we need to debug the html/js it is readable
app.locals.pretty = true;

app.use(logger('dev'));
// so we can send put, delete, etc. example: action="/resource?_method=DELETE"
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// of course this key should be changed!
// also, in production we should probably use redis or
// similar to store session data, otherwise if we restart the app
// this is lost.
app.use(
  session({
    secret: 'super_secret_key',
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// include and register our routes
var routes = require('./routes/index');
var company = require('./routes/company');
var title = require('./routes/title');

app.use('/', routes);
app.use('/company', company);
app.use('/title/', title);

// the below is auto-generated
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
