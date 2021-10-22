const isStringBinary = str => {
    str = String(str).split(" ").filter(elem => !!elem && elem != ",")
    if (!str) return false
    for (let bin of str) {
        if (!isWordBinary(bin)) return false
    }
    return true
}
const isBinary = (strarr) => {

}

function isWordBinary(word) {
    word = word.split("")
    return isArrCharBinary(word)
}
function isStringsBinary(strings) {
    for (let string of strings) {
        if (!isWordBinary(string)) return false
    }
    return true
}
function isArrCharBinary(str) {
    for (let char of str) {
        if (!isBoolean(char)){
            return false
        } 
    }
    return true
}

function isBoolean(elem) {
    elem = Number(elem)
    const isBinaryNum = elem === 0 || elem === 1
    const isInValid = Number.isNaN(elem)
    if (isInValid || !isBinaryNum) {
        return false;
    }
    return true
}

module.exports = {
    isStringBinary,
    isWordBinary,
    isStringsBinary,
    isArrCharBinary,
    isBinary
}