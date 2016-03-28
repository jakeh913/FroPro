var express = require('express');
var path = require('path');
var logger = require('morgan')
var bodyParser = require('body-parser');
var passport = require('passport');
//test git message to removed lateddfdr
// AUTH - Bring in the data model
require('./authAPI/models/users');
// AUTH Bring in the Passport config after model is defined
require('./authAPI/config/passport');
// AUTH Bring in the routes for the API (delete the default routes)
var routesApi = require('./authAPI/routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/api/postings',require('./controllers/api/postings'));//

// AUTH Initialise Passport before using the route middleware
app.use(passport.initialize());
// AUTH Use the API routes when path starts with /api
app.use('/authAPI', routesApi);

app.use(require('./controllers/static'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// AUTH Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

	
app.listen('9001', function (){
	console.log('hello world!');
});

