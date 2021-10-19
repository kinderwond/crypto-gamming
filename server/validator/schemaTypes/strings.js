const joi = require('joi')

module.exports = {
    str() {
        return joi.string()
    },
    email() {
        return joi.string().email()
    },
    binary(){
        return joi.binary()
    }
}
