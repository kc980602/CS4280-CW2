function toInstanceForce(obj, raw) {
    for (const propName in obj) {
        obj[propName] = raw[propName]
    }
    return obj;
}

function toInstanceForceArray(obj, rawArray) {
    const objArray = []
    for (const item of rawArray) {
        objArray.push(toInstanceForce(Object.assign({}, obj), item))
    }
    return objArray
}

module.exports = {
    toInstanceForce,
    toInstanceForceArray
}
