const { binToDec, decToBin } = require('../../scale-of-notation/scale-of-notation.helpers')
/**
 * @description run feistel network functions flow
 * @param {*} param {
 *  text : string[]
 *   key: stringp[]
 *   operation: {
 *     operation: "+" | "-" | "*" | "/"
 *     value: number
 *   }
 * }
 */
const decorateArrays = ({ text, key, operation }) => {
    let mutatedArrays = {
        text: [],
        key: []
    }
    for (let i = 0 ; i < textBinArr.length; i++) {
        let currentSymbols = {
            text: binToDec(textBinArr[i]),
            key: binToDec(keyBinArr[i])
        }
        
        currentSymbols.text = execOperation(operation.operation, currentSymbols.text, operation.value)
        currentSymbols.key = execOperation(operation.operation, currentSymbols.key, operation.value)

        mutatedArrays.text.push(decToBin(currentSymbols.text))
        mutatedArrays.key.push(decToBin(currentSymbols.key))
    }
    return {
        ...mutatedArrays
    }   
}

const execOperation = (operation, firstVal, secondVal) => {
    switch (operation) {
        case "+":
            return firstVal + secondVal
        case "-":
            return firstVal - secondVal
        case "*":
            return firstVal * secondVal
        case "/":
            return firstVal / secondVal
    }
}

module.exports = {
    decorateArrays,
    execOperation
}