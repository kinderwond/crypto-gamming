/**
 * 
 * @param {*} text 
 * @param {*} key 
 * @returns 
 */
const exec = async (text, key) => {
    text = text.split(" ")
    key = key.split(" ")

    let encodedStr = await encodeBinaryText(text, key, 0)
    encodedStr = encodedStr.filter(elem  => !!elem)
    return encodedStr
}

/**
 * @description compute XOR between to binary arrays
 * @param {array} text 
 * @param {array} key  
 * @returns array ["1101", "1101", "110110"]
 */
async function encodeBinaryText(text, key, page) {
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