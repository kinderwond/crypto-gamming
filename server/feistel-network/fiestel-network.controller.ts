import {Request, Response} from "express";

import services from "./feistel-network.service"
import * as  mappers from "./feistel-network.mapper"
import {IMapTranscodeRound} from "./feistel-network.mapper";

export const encode = async (req: Request, res: Response) => {
    try {
        let {text, key} = req.body
        const encoded = services.runFeistelNetwork({
            text,
            key
        })
        res.status(200).json({
            result: encoded
        })
    } catch (e) {
        console.log(`---POST--- { feistel } [encode] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}
export const encodeRound = async (req: Request, res: Response) => {
    try {
        const {round, text, key} = req.body
        if (round < 1 || round > 16) {
            throw new Error("Round should be 1 <= n <= 16")
        }
        const result = services.runRound({
            text,
            key,
            round,
            isDecoding: false
        })
        const test: IMapTranscodeRound = {
            text: result.text,
            key: result.key,
            mutatedKey: result.mutatedKey,
            round: result.round
        }
        return res.status(200).json({
            result: mappers.mapTranscodeRound(test)
        })
    } catch (e) {
        console.log(`---POST--- { feistel } [decodeRound] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}
export const decodeRound = async (req: Request, res: Response) => {
    try {
        const {round, text, key} = req.body
        if (round < 1 || round > 16) {
            throw new Error("Round should be 1 <= n <= 16")
        }
        const result = services.runRound({
            text,
            key,
            round,
            isDecoding: true
        })
        return res.status(200).json({
            result
        })
    } catch (e) {
        console.log(`---POST--- { feistel } [decodeRound] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}
export const decode = async (req: Request, res: Response) => {
    try {
        const {round, text, key} = req.body
        /**
         * TODO
         * run all runds
         */
    } catch (e) {
        console.log(`---POST--- { feistel } [decode] Error`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
}