import {Express} from "express";

const controllers = require("./fiestel-network.controller")
import validator from "../validator/validator.validate"

import schemas from "./feistel-network.schema"

const urlPrefix = "/feistel"
const createUrl = (url: string): string => urlPrefix + url


export default (app: Express, jsonParser: any) => {
    app.post("/feistel/:transcode/round", validator.schema(schemas.codeRound), controllers.encodeRound)

    // app.post("/feistel/decode/round", controllers.decodeRound)
}