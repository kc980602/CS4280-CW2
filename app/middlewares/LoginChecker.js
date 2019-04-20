function LoginChecker(req, res, next) {
    res.locals.isLogin = req.session.user && req.cookies.user_sid;
    next();
}

module.exports = LoginChecker;
