/**
 * 
 * @param {*} text 
 * @param {*} key 
 * @returns 
 */
const exec = (text, key) => {
    if (typeof text === "string")
        text = text.split(" ")
    if (typeof key === "string")
        key = key.split(" ")

    let encodedStr = encodeBinaryText(text, key, 0)
    encodedStr = encodedStr.filter(elem => !!elem)
    return encodedStr
}

/**
 * @description compute XOR between to binary arrays
 * @param {array} text 
 * @param {array} key  
 * @returns array ["1101", "1101", "110110"]
 */
function encodeBinaryText(text, key, page) {
    const res = []
    for (let index in text) {
        const char = text[index]
        if (!char) {
            res.push(char)
            continue;
        }
        const encodedChar = binaryXOR(char, key[index])
        res.push(encodedChar)
    }
    return res
}

function prepareBin(first, second) {
    if (first.length > second.length) {
        const limit = first.length - second.length
        for (let i = 0; i < limit; i++) {
            second = "0" + second
        }
    } else if (second.length > first.length) {
        const limit = second.length - first.length
        for (let i = 0; i < limit; i++) {
            first = "0" + first
        }
    }
    return {
        firstBin: first,
        secondBin: second
    }
}
const binaryXOR = (firstBinary, secondBinary) => {
    console.log("binaryXOR input", firstBinary);
    const { firstBin, secondBin } = prepareBin(firstBinary, secondBinary)
    return firstBin.split("").map((char, index) => {
        const int = {
            first: +char,
            second: +secondBin[index]
        }
        return expressionToNumString(
            (int.first && int.second) ||
            (!int.first && !int.second)
        )
    }).join("")
}

const expressionToNumString = (expresion) => String(Number(!!expresion))

module.exports = exec