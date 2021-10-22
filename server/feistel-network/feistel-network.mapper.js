const helpers = require("./fiestel-network.helpers")
const mapTranscodeRound = (options) => {
    console.log("mapTransecodeRound", options);
    let {text, key, mutatedKey, round} = options || {}
    const res = {}
    if (text || text.length) {
        text = flat(text)
        res.text = helpers.arrToStr(text, " ")
    } 
    if (mutatedKey || mutatedKey.length) {
        mutatedKey = flat(mutatedKey)
        res.mutatedKey = helpers.arrToStr(mutatedKey, " ")
    } 
    if (key || key.length) {
        key = flat(key)
        res.key = helpers.arrToStr(key, " ")
    } 
    return {
        ...res,
        round
    }
}

function flat  (arr) {
    if (Array.isArray(arr)) {
        return  [].concat.apply([], arr);
    }
    return arr
}


module.exports = {
    mapTranscodeRound
}