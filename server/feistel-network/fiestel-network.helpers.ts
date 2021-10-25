const prepareBinary = (bin: string | string[]) : string[]=> {
    if (!Array.isArray(bin)) {
        bin = bin.split(" ")
    }
    return bin
}
const getFirstArrHalf = (arr: string[]): string[] => {
    return arr.slice(
        0,
        Math.floor(arr.length / 2)
    )
}
const getSecondArrHalf = (arr: string[]): string[]=> {
    return arr.slice(
        0,
        Math.floor(arr.length / 2)
    )
}

const arrToStr = (arr: string | unknown[], delimiter = "")=> {
    if (typeof arr === "string") return arr
    if (!Array.isArray(arr)) {
        throw new Error("{ arrToStr } input array not an array or string")
    }
    return arr.join(delimiter)
}
export default {
    prepareBinary,
    getFirstArrHalf,
    getSecondArrHalf,
    arrToStr
}