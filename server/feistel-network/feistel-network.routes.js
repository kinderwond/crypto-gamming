const controllers = require("./fiestel-network.controller")

const urlPrefix = "/feistel"
const createUrl = (url) => urlPrefix + url
module.exports = (app, jsonParser) => {
    app.post(createUrl("/decode"), jsonParser)
    app.post(createUrl("/decode-round"), jsonParser)
    app.post(createUrl("/encode"), jsonParser, controllers.encode)
}