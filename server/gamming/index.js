const encodeText = require("./createXOR")
const gamming = (str, key) => {
    console.log("gaming encode text before", str, key);
    return encodeText(str, key)
}

module.exports = {
    gamming
}