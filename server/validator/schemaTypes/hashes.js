const joi = require('joi')

module.exports = {
    obj(keys) {
        return keys ? joi.object().keys(keys) : joi.object()
    },
    arr(items) {
        return joi.array().items(items)
    }
}
