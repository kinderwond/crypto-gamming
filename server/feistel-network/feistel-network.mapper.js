const helpers = require("./fiestel-network.helpers")
const mapTranscodeRound = (options) => {
    console.log("mapTransecodeRound", options);
    const {text, key, mutatedKey, round} = options || {}
    const res = {}
    if (text || text.length) {
        res.text = helpers.arrToStr(text, " ")
    } 
    if (mutatedKey || mutatedKey.length) {
        res.mutatedKey = helpers.arrToStr(mutatedKey, " ")
    } 
    if (key || key.length) {
        res.key = helpers.arrToStr(key, " ")
    } 
    return {
        ...res,
        round
    }
}



module.exports = {
    mapTranscodeRound
}