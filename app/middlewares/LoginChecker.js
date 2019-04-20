function LoginChecker(req, res, next) {
    req.login = req.session.user && req.cookies.user_sid;
    res.locals.isLogin = req.login;
    next();
}

module.exports = LoginChecker;
