const check = function (req, params, bodys) {

    const missedP= []
    const missedB = []

    for (const item of params) {
        if (!req.query.hasOwnProperty(item) || req.query[item] === '') {
            missedP.push(item)
        }
    }
    for (const item of bodys) {
        if (!req.body.hasOwnProperty(item) || req.body[item] === '') {
            missedB.push(item)
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
