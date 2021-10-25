export  const isStringBinary = (str: string) => {
    const res = String(str).split(" ").filter(elem => !!elem && elem != ",")
    if (!res) return false
    for (let bin of res) {
        if (!isWordBinary(bin)) return false
    }
    return true
}

export function isWordBinary(word: string) {
    return isArrCharBinary(
        word.split("")
    )
}

export function isStringsBinary(strings: string[]) {
    for (let string of strings) {
        if (!isWordBinary(string)) return false
    }
    return true
}

export function isArrCharBinary(str: string[]) {
    for (let char of str) {
        if (!isBoolean(char)) {
            return false
        }
    }
    return true
}

export function isBoolean(elem: any) {
    elem = Number(elem)
    const isBinaryNum = elem === 0 || elem === 1
    const isInValid = Number.isNaN(elem)
    if (isInValid || !isBinaryNum) {
        return false;
    }
    return true
}
