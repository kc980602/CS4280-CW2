const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const LoginChecker = require('./app/middlewares/LoginChecker')

const indexRouter = require('./app/routes/index');
const userRouter = require('./app/routes/user');
const albumRouter = require('./app/routes/album');
const shopRouter = require('./app/routes/shop');
const adminRouter = require('./app/routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
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

app.use(LoginChecker)
// app.locals.isLogin = LoginChecker
app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', albumRouter);
app.use('/', shopRouter);
app.use('/admin', adminRouter);

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