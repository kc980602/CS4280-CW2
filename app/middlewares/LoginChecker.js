function LoginChecker(req, res, next) {
    req.login = req.session.user && req.cookies.user_sid
    next()
}

module.exports = LoginChecker
