/**
 *
 * @param {*} text
 * @param {*} key
 * @returns
 */
const exec = (text: string | string[], key: string | string[]): string[] => {
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
function encodeBinaryText(text: string[], key: string[], page: number) {
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

function prepareBin(first: string, second: string) {
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

const binaryXOR = (firstBinary: string, secondBinary: string) => {
    console.log("binaryXOR input", firstBinary);
    const {firstBin, secondBin} = prepareBin(firstBinary, secondBinary)
    return firstBin.split("").map((char: string, index: number) => {
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

const expressionToNumString = (expresion: unknown) => String(Number(!!expresion))

export default exec