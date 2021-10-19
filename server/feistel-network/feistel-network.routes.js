const controllers = require("./fiestel-network.controller")
const {schema : validate, schema} = require("../validator/validator.validate")
const schemas = require("./feistel-network.schema")

const urlPrefix = "/feistel"
const createUrl = (url) => urlPrefix + url


module.exports = (app, jsonParser) => {
    app.post(createUrl("/encode"), jsonParser, controllers.encode)
    app.post(createUrl("/encode/round"), [jsonParser, validate(schemas.codeRound)], controllers.encodeRound)

    app.post(createUrl("/decode"), jsonParser, controllers.decode)
    app.post(createUrl("/decode/round"), jsonParser, controllers.decodeRound)
}