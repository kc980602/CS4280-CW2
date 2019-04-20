function toNumber(data, defaultNum = 0) {
    let num = Number(data)
    if (isNaN(num))
        num = defaultNum
    return num
}
module.exports = toNumber
