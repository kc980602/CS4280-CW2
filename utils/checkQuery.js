const check = function (req, params, bodys) {

    const missedP= []
    const missedB = []

    for (const i in params) {
        if (!req.query.hasOwnProperty(params[i]) || req.query[bodys[i]] === '') {
            missedP.push(params[i])
        }
    }
    for (const i in bodys) {
        if (!req.body.hasOwnProperty(bodys[i])) {
            missedB.push(bodys[i])
        }
    }

    let errorMsg = ''
    if (missedP.length > 0) errorMsg += 'Param ' + missedP.join() + ' missed.'
    if (missedB.length > 0) errorMsg += 'Body property ' + missedB.join() + ' missed.'
    if (errorMsg !== '') {
        return true
    }
}
module.exports = check
