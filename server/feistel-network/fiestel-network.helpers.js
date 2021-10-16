const prepareBinary = (bin) => {
    if (!Array.isArray(bin)) {
        bin = bin.split(" ")
    }
    return bin
}
const getFirstArrHalf = (arr) => {
    return arr.slice(
        0,
        Math.floor(arrl.length / 2)
    )
}
const getSecondArrHalf = (arr) => {
    return arr.slice(
        0,
        Math.floor(arrl.length / 2)
    )
}
module.exports = {
    prepareBinary,
    getFirstArrHalf,
    getSecondArrHalf
}