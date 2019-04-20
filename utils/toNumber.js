function toNumber(data, defaultNum = 0){
    let num = Number(data)
    if(isNaN(num)){
        num = defaultNum
    }
    console.log('num', num)
    return num
}
module.exports = toNumber
