const { gamming } = require('../gamming')

/**
 * 
 * @param {*} options  {
 *   roundCounter: number
 *   key: string[] - array of binaries
 *   text: string[] - array of binaries
 * }
 */
const run = (options) => {
    const {  key, text } = options || {}
    let { roundCounter} = options || {}
    console.log(`{ feistel service } run text`);
    console.log(text);
    let roundArr = [...text]
    if (!roundCounter) {
        roundCounter = 4
    }
    for (let i = 0; i < roundCounter; i++) {
        console.log("run round");
        roundArr = runRound(roundArr, [...key])
    }
    console.log("result round array", roundArr);
    return roundArr
}


/**
 * 
 * @param {*} charactersArr
 * @param {*} key 
 */
const runRound = (charactersArr, key) => {

    const arrLen = charactersArr.length
    const halfArrLen = Math.floor(arrLen / 2)
    const halfs = {
        first: arr.slice(0, halfArrLen - 1),
        second: arr.slice(halfArrLen, arrLen),
    }
    console.log(`{ runRound} halfs: ${halfs.first} | ${halfs.second}`);
    arr = [
        ...gamming(halfs.first, key),
        ...gamming(halfs.second, key)
    ]
    arr = switchTwoHalfs([...arr])
    return [...arr]
}

const switchTwoHalfs = (arr) => {
    const len = arr.length
    const halfLen = Math.floor(len / 2)
    const first = arr.slice(0, halfLen)
    const second = arr.slice(halfLen, len)
    return [
        ...second,
        ...first
    ]
}

module.exports = run

setTimeout(() => {
    console.log('timeout');
  }, 0);
  
  setImmediate(() => {
    console.log('immediate');
  });