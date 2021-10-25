import joi from "joi"

export default (fn: Function) => {
    return joi.custom((value, helper) => {
        return fn(value, helper)
    })
}