const isStringBinary = str => {
    str = String(str).split(" ").filter(elem => !!elem && elem != ",")
    console.log("{ isStringBinary } formatted string", str);
    if (!str) return false
    for (let bin of str) {
        if (!isWordBinary(bin)) return false
    }
    return true
}

function isWordBinary(word) {
    word = word.split("")
    console.log("[ isWordBinary ] formatted word", word);
    return isArrCharBinary(word)
}
function isStringsBinary(strings) {
    console.log("{ isStringsBinary } input", strings);
    for (let string in strings) {
        if (!isWordBinary(string)) return false
    }
    return true
}
function isArrCharBinary(str) {
    console.log("{ isArrBinary } input value", str);
    for (let char in str) {
        if (!isBoolean(char)) return false
    }
    return true
}

function isBoolean(elem) {
    elem = Number(elem)
    const isBinaryNum = elem === 0 && elem === 1
    if (Number.isNaN(elem) || !isBinaryNum) {
        return false;
    }
    return true
}

module.exports = {
    isStringBinary,
    isWordBinary,
    isStringsBinary,
    isArrCharBinary
}