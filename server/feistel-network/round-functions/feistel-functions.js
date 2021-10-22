const {decorateArrays} = require("./feistel-functions.helpers");
const fn1 = (options) => {
    console.log("fn 1 option", options);
    const { text: textBinArr,key: keyBinArr } = options || {}
    console.log("<-- feistel network --> __functions__ { fn1 } input", textBinArr, keyBinArr);
    const operationValue = 4
    return decorateArrays({
        text: textBinArr,
        key: keyBinArr,
        operation: {
            operation: "+",
            value: operationValue
        }
    })
}

const fn2 = (textBinArr, keyBinArr) => {
    const operationValue = 13
    return decorateArrays({
        text: textBinArr,
        key: keyBinArr,
        operation: {
            operation: "-",
            value: operationValue
        }
    })
}
const revertFn1 = (textBinArr, keyBinArr) => {
    const operationValue = 4
    return decorateArrays({
        text: textBinArr,
        key: keyBinArr,
        operation: {
            operation: "-",
            value: operationValue
        }
    })
}
const revertFn2 = (textBinArr, keyBinArr) => {
    const operationValue = 13
    return decorateArrays({
        text: textBinArr,
        key: keyBinArr,
        operation: {
            operation: "+",
            value: operationValue
        }
    })
}
module.exports = {
    fn1,
    fn2,
    revertFn1,
    revertFn2
}