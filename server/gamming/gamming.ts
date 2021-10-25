const encodeText = require("./createXOR")
const gamming = (str: string, key: string) => {
    return encodeText(str, key)
}

const run = async () => {
    const key = "this fuck shit"
    const encoded = await gamming("fuck this shit", key)
    console.log("encoded", encoded);
    const decoded = await gamming(encoded, key)
    console.log("decoded", decoded);
}
run()