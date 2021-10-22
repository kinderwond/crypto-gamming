const prepareBinary = (bin) => {
    if (!Array.isArray(bin)) {
        bin = bin.split(" ")
    }
    return bin
}
const getFirstArrHalf = (arr) => {
    return arr.slice(
        0,
        Math.floor(arr.length / 2)
    )
}
const getSecondArrHalf = (arr) => {
    return arr.slice(
        0,
        Math.floor(arr.length / 2)
    )
}

const arrToStr = (arr, delimiter = "")=> {
    if (typeof arr === "string") return arr
    if (!Array.isArray(arr)) {
        throw new Error("{ arrToStr } input array not an array or string")
    }
    return arr.join(delimiter)
}
module.exports = {
    prepareBinary,
    getFirstArrHalf,
    getSecondArrHalf,
    arrToStr
}