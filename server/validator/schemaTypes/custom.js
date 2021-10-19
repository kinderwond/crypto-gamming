const joi = require('joi')

module.exports = (fn) => {
    return joi.custom((value, helper) => {
        return fn(value, helper)
    })
}