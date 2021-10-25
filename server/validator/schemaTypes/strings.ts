import joi from "joi"
export default {
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
