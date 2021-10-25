import {gamming} from '../gamming'
import roundFn from "./round-functions/feistel-functions"
import helpers from "./fiestel-network.helpers"

/**
 *   key: string[] - array of binaries
 *   text: string[] - array of binaries
 */
const runFeistelNetwork = ({text, key}: { text: string[], key: string[] }) => {
    const ROUNDS = 16
    const roundsResult = []

    for (let round = 1; round <= ROUNDS; round++) {
        roundsResult.push(
            runRound({
                text,
                key,
                isDecoding: false,
                round
            })
        )
    }
    return roundsResult
}

/**
 *
 * @param {*} charactersArr
 * @param {*} key
 */
export interface IRunRound {
    isDecoding: boolean,
    text: string | string[],
    key: string | string[],
    round: number
}

export interface IRunRoundResult {
    isDecoding: boolean,
    text: string[],
    key: string[],
    mutatedKey: string[],
    round: number
}

const runRound = ({text, key, round, isDecoding}: IRunRound): IRunRoundResult => {

    console.log("RUN ROUND", key)
    text = helpers.prepareBinary(text)
    const preparedKey: string[] = helpers.prepareBinary(key)
    /**
     * FLOW
     * 1. detect is decoding and get magic round fn
     * 2. get second text half
     * 3. mutate 2) with key
     * 4. gamming result 3)
     * 5. return {
     *     text: with swapped halfs
     *     key: mutated.key
     *     round
     * }
     */

        //1)
    const roundFn = getRoundFn(round, isDecoding)
    //2)
    const halfs = {
        first: helpers.getFirstArrHalf(text),
        second: helpers.getSecondArrHalf(text)
    }
    //3)
    console.log("roundfN", roundFn);
    const mutated = roundFn(halfs.second, preparedKey)
    console.log(`<--- feistel network --> __service__ { runROund } mutated`, mutated);
    //4)
    const gammingRes: string[] = gamming(mutated.text, mutated.key)

    //5)
    console.log("gammingres", gammingRes);
    const roundInfo: IRunRoundResult = {
        text: [
            ...gammingRes,
            ...halfs.first
        ],
        mutatedKey: mutated.key,
        key: preparedKey,
        round,
        isDecoding,
    }
    console.log("round info", roundInfo)
    return roundInfo
}

const getRoundFn = (num: number, isReverting: boolean): Function => {
    num = Number(num)
    if (Number.isNaN(num) || !Number.isInteger(num)) {
        throw new Error("{ getRoundFn } number round is not integer")
    }
    const fn1Rounds = [1, 3, 6, 8, 9, 10, 14, 15]
    const fn2Rounds = [2, 4, 5, 7, 11, 12, 13]

    //return revert functions
    if (isReverting) {
        if (fn1Rounds.indexOf(num) !== -1) return roundFn.revertFn1
        if (fn2Rounds.indexOf(num) !== -1) return roundFn.revertFn2
    }
    // console.log(fn1Rounds, fn2Rounds.indexOf(num), fn1Rounds.find(num));
    if (fn1Rounds.indexOf(num) != -1) return roundFn.fn1
    if (fn2Rounds.indexOf(num) != -1) return roundFn.fn2
    throw new Error("Invalid round! Pass 1 <= n <= 16")
}

export default {
    runRound,
    runFeistelNetwork
}