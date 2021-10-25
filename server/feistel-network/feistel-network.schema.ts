import joi from "joi";

const {custom, obj, required, max, min, int, double} = require('../validator/schemaTypes')
const {isStringBinary, isWordBinary, isStringsBinary} = require("../scale-of-notation/scale-of-notation.schema")
export default {
    // /encode, /decode routing
    codeRound: joi.object().keys({
        text: joi.required().custom((value: any, helpers: any) => {
            if (!value) {
                return helpers.message("Text should be required")
            }
            if (typeof value !== "string") {
                return helpers.message("Text should be binary string")
            }

            value = String(value).split(/\s/g).filter(elem => !!elem)
            console.log("{ text } formatted value", value);
            const isOneBinary = value.length === 1
            if (isOneBinary && !isWordBinary(value[0])) {
                // console.log("ONE BINARY");
                return helpers.message("Text should be binary (one)")
            }

            console.log(isStringsBinary)
            if (!isStringsBinary(value)) {
                // console.log("TEXT BINARY");
                return helpers.message("Text should be binary (two)")
            }

            return true
        }),
        round: joi.number().integer().required().min(1).max(16),
        key: joi.custom((value: any, helpers: any) => {
            if (!value) {
                return helpers.message("Key should be required")
            }
            if (typeof value !== "string") {
                return helpers.message("Key should be binary string")
            }

            value = String(value).split(/\s/g).filter(elem => !!elem)
            console.log("{ text } formatted value", value);
            const isOneBinary = value.length === 1
            if (isOneBinary && !isWordBinary(value[0])) {
                // console.log("ONE BINARY");
                return helpers.message("Key should be binary (one)")
            }

            if (!isStringsBinary(value)) {
                // console.log("TEXT BINARY");
                return helpers.message("Key should be binary (two)")
            }

            return true
        }),
    })
}



