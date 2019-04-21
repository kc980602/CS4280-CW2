const check = function (req, query, bodys) {

    const missedQ= []
    const missedB = []

    for (const item of query) {
        if (!req.query.hasOwnProperty(item) || req.query[item] === '') {
            missedQ.push(item)
        }
    }
    for (const item of bodys) {
        if (!req.body.hasOwnProperty(item) || req.body[item] === '') {
            missedB.push(item)
        }
    }

    let errorMsg = ''
    if (missedQ.length > 0) errorMsg += 'Param ' + missedQ.join() + ' missed.'
    if (missedB.length > 0) errorMsg += 'Body property ' + missedB.join() + ' missed.'
    if (errorMsg !== '') {
        return true
    }
}
module.exports = check
