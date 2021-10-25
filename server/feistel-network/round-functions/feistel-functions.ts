import {decorateArrays, OPERATION} from "./feistel-functions.helpers";


const fn1 = (textBinArr: string[], keyBinArr: string[]) => {
    console.log("<-- feistel network --> __functions__ { fn1 } input", textBinArr, keyBinArr);
    const operationValue = 4
    return decorateArrays({
        text: textBinArr,
        key: keyBinArr,
        operation: {
            operation: OPERATION.PLUS,
            value: operationValue
        }
    })
}

const fn2 = (textBinArr: string[], keyBinArr: string[]) => {
    const operationValue = 13
    return decorateArrays({
        text: textBinArr,
        key: keyBinArr,
        operation: {
            operation: OPERATION.MINUS,
            value: operationValue
        }
    })
}
const revertFn1 = (textBinArr: string[], keyBinArr: string[]) => {
    const operationValue = 4
    return decorateArrays({
        text: textBinArr,
        key: keyBinArr,
        operation: {
            operation: OPERATION.MINUS,
            value: operationValue
        }
    })
}
const revertFn2 = (textBinArr: string[], keyBinArr: string[]) => {
    const operationValue = 13
    return decorateArrays({
        text: textBinArr,
        key: keyBinArr,
        operation: {
            operation: OPERATION.PLUS,
            value: operationValue
        }
    })
}
export default {
    fn1,
    fn2,
    revertFn1,
    revertFn2
}