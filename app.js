var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./app/routes/index');
var albumRouter = require('./app/routes/album');
var shopRouter = require('./app/routes/shop');
var authRouter = require('./app/routes/auth');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'One Music is the best!!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', albumRouter);
app.use('/', shopRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
