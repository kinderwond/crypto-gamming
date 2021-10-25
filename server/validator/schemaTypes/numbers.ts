import joi from "joi"
export default {
    int() {
        return joi.number().integer()
    },
    double() {
        return joi.number()
    },

    min(num: number) {
        return joi.number().min(num)
    },

    max(num: number) {
        return joi.number().max(num)
    },
}
