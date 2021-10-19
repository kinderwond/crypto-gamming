const {gamming} = require('../gamming')
const roundFn = require("./round-functions/feistel-functions")
const helpers = require("./fiestel-network.helpers")

/**
 *   key: string[] - array of binaries
 *   text: string[] - array of binaries
 */
const runFeistelNetwork = ({text, key}) => {
    const ROUNDS = 16
    const roundsResult = []

    for (let round = 1 ; round <= ROUNDS; round++) {
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
const runRound = ({text, key, round, isDecoding}) => {

    text = helpers.prepareBinary(text)
    key = helpers.prepareBinary(key)
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
    const mutated = roundFn({ text: halfs.second,  key })
    //4)
    const gammingRes = gamming(mutated.text, mutated.key)

    //5)
    const roundInfo = {
        text: [...gammingRes,  halfs.first],
        mutatedKey: mutated.key,
        key: key,
        round,
    }
    console.log("round info", roundInfo)
    return roundInfo
}

const getRoundFn = (num, isReverting) => {
    const fn1Rounds = [1, 3, 6, 8, 9, 10, 14, 15]
    const fn2Rounds = [2, 4, 5, 7, 11, 12, 13]

    //return revert functions
    if (isReverting) {
        if (fn1Rounds.find(num)) return roundFn.revertFn1
        if (fn2Rounds.find(num)) return roundFn.revertFn2
    }
    if (fn1Rounds.find(num)) return roundFn.fn1
    if (fn2Rounds.find(num)) return roundFn.fn2
    throw new Error("Invalid round! Pass 1 <= n <= 16")
}

module.exports = {
    runRound,
    runFeistelNetwork
}