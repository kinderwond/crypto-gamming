const joi = require('joi')

module.exports = {
    int() {
        return joi.number().integer()
    },
    double() {
        return joi.number()
    }


}
