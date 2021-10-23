const joi = require('joi')

module.exports = {
    int() {
        return joi.number().integer()
    },
    double() {
        return joi.number()
    },

    min(num) {
        return joi.min(num)
    },

    max(num) {
        return joi.max(num)
    },
}
