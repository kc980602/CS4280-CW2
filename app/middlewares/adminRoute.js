const adminRoute = async (req, res, next) => {
    if (req.session.user && req.session.user.role === 'ADMIN') {
        next()
    } else {
        res.redirect('/');
    }
}
module.exports = adminRoute
