const LoginChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        req.login = true
    }else{
        req.login = false
    }
    next()
}

module.exports = LoginChecker