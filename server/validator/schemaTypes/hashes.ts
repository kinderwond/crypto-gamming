import joi from "joi"

export default {
    obj(keys: object) {
        return keys ? joi.object().keys(keys) : joi.object()
    },
    arr(items: any[]) {
        return joi.array().items(...items)
    }
}
