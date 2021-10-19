const { custom, obj, required } = require('../validator/schemaTypes')
const { isStringBinary, isWordBinary,  isStringsBinary } = require("../scale-of-notation/scale-of-notation.schema")
module.exports = {
    // /encode, /decode routing
    codeRound: obj({
        text: required().custom((value, helpers) => {
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
                console.log("ONE BINARY");
                return helpers.message("Text should be binary (one)")
            }

            if (!isStringsBinary(value)) {
                console.log("TEXT BINARY");
                return helpers.message("Text should be binary (two)")
            }

            return true
        }),
        key: custom((value, helpers) => {
            if (!value) {
                return helpers.message("Key should be required")
            }
            if (typeof value !== "string") {
                return helpers.message("Ket should be binary string")
            }
            value = String(value).split(" ").filter(elem => !!elem)
            const isOneBinary = value.length === 1
            console.log("{ key } formatted value", value);
            if (isOneBinary && !isWordBinary(value[0])) {
                return helpers.message("Key should be binary")
            }
            console.log("{ key } is string binary", value, isStringBinary(value));
            if (!isStringBinary(value)) {
                console.log("LONG KEY INVALID");
                return helpers.message("Key should be binary")
            }

            return true
        }),
    })
}



