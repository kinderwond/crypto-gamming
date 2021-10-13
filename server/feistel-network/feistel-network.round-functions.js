const { binToDec, decToBin } = require('../scale-of-notation/scale-of-notation.helpers')


const fn1 = (textBinArr, keyBinArr) => {
    const operationValue = 4
    let mutatedArrays = {
        text: [],
        key: []
    }
    for (let i = 0 ; i < textBinArr.length; i++) {
        let currentSymbols = {
            text: binToDec(textBinArr[i]),
            key: binToDec(keyBinArr[i])
        }
        currentSymbols.text += operationValue
        currentSymbols.key += operationValue

        mutatedArrays.text.push(decToBin(currentSymbols.text))
        mutatedArrays.key.push(decToBin(currentSymbols.key))
    }
    return {
        ...mutatedArrays
    }
}

const fn2 = (textBinArr, keyBinArr) => {
    const operationValue = 13
    let mutatedArrays = {
        text: [],
        key: []
    }
    for (let i = 0 ; i < textBinArr.length; i++) {
        let currentSymbols = {
            text: binToDec(textBinArr[i]),
            key: binToDec(keyBinArr[i])
        }
        currentSymbols.text -= operationValue
        currentSymbols.key -= operationValue

        mutatedArrays.text.push(decToBin(currentSymbols.text))
        mutatedArrays.key.push(decToBin(currentSymbols.key))
    }
    return {
        ...mutatedArrays
    }   
}

module.exports = {
    fn1,
    fn2
}