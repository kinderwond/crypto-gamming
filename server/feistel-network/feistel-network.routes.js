const controllers = require("./fiestel-network.controller")

const urlPrefix = "/feistel"
const createUrl = (url) => urlPrefix + url
module.exports = (app, jsonParser) => {
    app.post(createUrl("/encode"), jsonParser, controllers.encode)
    app.post(createUrl("/decode/round"), jsonParser, controllers.encodeRound)

    app.post(createUrl("/decode"), jsonParser, controllers.decode)
    app.post(createUrl("/decode/round"), jsonParser, controllers.decodeRound)
}