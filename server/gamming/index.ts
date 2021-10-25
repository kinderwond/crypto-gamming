import encodeText from "./createXOR"

export const gamming = (str: string | string[], key: string | string[]) : string[] => {
    console.log("gaming encode text before", str, key);
    return encodeText(str, key)
}
