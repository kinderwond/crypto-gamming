const encode = async (req, res) => {
    try {
        let { text, key } = req.body
        text = text.split(" ")
        key = key.split(" ")
        const encoded = await createfeistelNetwork({
            roundCounnter: process.env.FEISTEL_COUNTER || 4,
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
const decodeRound = async (req, res) => {
    try {
        const {round, text, key} = req.body
        /**
         * TODO
         * run one round
         */
    }catch (e) {
        console.log(`---POST--- { feistel } [decodeRound] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}
const decode =  async (req, res) => {
    try {
        const {round, text, key} = req.body
        /**
         * TODO
         * run all runds
         */
    }catch (e) {
        console.log(`---POST--- { feistel } [decode] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}
module.exports = {
    encode,
    decode,
    decodeRound
}