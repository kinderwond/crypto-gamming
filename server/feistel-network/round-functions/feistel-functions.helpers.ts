import {number} from "joi";

import helpers from '../../scale-of-notation/scale-of-notation.helpers'

const {binToDec, decToBin} = helpers

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

export enum OPERATION {
    PLUS = "+",
    MINUS = "-",
    MULTIPLICATION = "*",
    DIVISION = "/"
}

export interface IDecorateArrays {
    text: string[],
    key: string[],
    operation: {
        operation: OPERATION,
        value: number
    }
}

export interface IDecorateArraysResponse {
    text: string[],
    key: string[]
}

export const decorateArrays = (options: IDecorateArrays): IDecorateArraysResponse => {
    console.log("{ decorate arrays } input");
    console.log(options);
    const {text: textBinArr, key: keyBinArr, operation} = options
    const mutatedArrays: IDecorateArraysResponse = {
        text: [],
        key: []
    }
    for (let i = 0; i < textBinArr.length; i++) {
        let currentSymbols = {
            text: binToDec(textBinArr[i]),
            key: binToDec(keyBinArr[i])
        }

        let executedOperation = execOperation(operation.operation, currentSymbols.text, operation.value)
        let binaryExecutedOperation = decToBin(executedOperation)
        mutatedArrays.text.push(binaryExecutedOperation)

        executedOperation = execOperation(operation.operation, currentSymbols.key, operation.value)
        binaryExecutedOperation = decToBin(executedOperation)
        mutatedArrays.key.push(binaryExecutedOperation)
    }
    return mutatedArrays
}

export const execOperation = (operation: OPERATION, firstVal: number, secondVal: number): number => {
    switch (operation) {
        case OPERATION.PLUS:
            return firstVal + secondVal
        case OPERATION.MINUS:
            return firstVal - secondVal
        case OPERATION.MULTIPLICATION:
            return firstVal * secondVal
        case OPERATION.DIVISION:
            return firstVal / secondVal
    }
}
