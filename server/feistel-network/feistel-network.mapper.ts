import helpers from "./fiestel-network.helpers"

export interface IMapTranscodeRound {
    round: number,
    text: string[],
    key: string[],
    mutatedKey: string[]
}

export interface IMapTranscodeRoundResult {
    round: number,
    text: string,
    key: string,
    mutatedKey: string
}

export const mapTranscodeRound = (options: IMapTranscodeRound): IMapTranscodeRoundResult => {
    console.log("mapTransecodeRound", options);
    let {text, key, mutatedKey, round} = options
    const res: IMapTranscodeRoundResult = {
        text: "",
        key: "",
        mutatedKey: "",
        round: -1
    }
    if (text && text.length) {
        text = flat(text)
        res.text = helpers.arrToStr(text, " ")
    }
    if (mutatedKey && mutatedKey.length) {
        mutatedKey = flat(mutatedKey)
        res.mutatedKey = helpers.arrToStr(mutatedKey, " ")
    }
    if (key && key.length) {
        key = flat(key)
        res.key = helpers.arrToStr(key, " ")
    }
    return {
        ...res,
        round
    }
}

function flat(arr: unknown[]): any[] {
    if (Array.isArray(arr)) {
        return [].concat.apply([], arr);
    }
    return arr
}

