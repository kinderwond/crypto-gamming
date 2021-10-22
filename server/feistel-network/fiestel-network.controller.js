const services = require("./feistel-network.service")
const mappers = require("./feistel-network.mapper")
const encode = async (req, res) => {
    try {
        let { text, key } = req.body
        const encoded = services.runFeistelNetwork({
            text,
            key
        })
        res.status(200).json({
            result: encoded
        })
    } catch (e) {
        console.log(`---POST--- { feistel } [encode] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}
const encodeRound = async (req, res) => {
    try {
        const { round, text, key } = req.body
        if (round < 1 || round > 16) {
            throw new Error("Round should be 1 <= n <= 16")
        }
        const result = services.runRound({
            text,
            key,
            round,
            isDecoding: false
        })
        return res.status(200).json({
            result: mappers.mapTranscodeRound(result)
        })
    } catch (e) {
        console.log(`---POST--- { feistel } [decodeRound] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}
const decodeRound = async (req, res) => {
    try {
        const { round, text, key } = req.body
        if (round < 1 || round > 16) {
            throw new Error("Round should be 1 <= n <= 16")
        }
        const result = services.runRound({
            text,
            key,
            round,
            isDecoding: true
        })
        return res.status(200).json({
            result
        })
    } catch (e) {
        console.log(`---POST--- { feistel } [decodeRound] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}
const decode = async (req, res) => {
    try {
        const { round, text, key } = req.body
        /**
         * TODO
         * run all runds
         */
    } catch (e) {
        console.log(`---POST--- { feistel } [decode] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}
module.exports = {
    encode,
    encodeRound,
    decode,
    decodeRound
}