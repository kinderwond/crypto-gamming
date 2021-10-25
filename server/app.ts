import {config} from "dotenv"

config()
import express, {Request, Response} from "express"
import cors from "cors"
import bodyParser from "body-parser"


import {gamming} from "./gamming"
import feisteilRoutes from "./feistel-network/feistel-network.routes"

const jsonParser = bodyParser.json()
const port = process.env.PORT || 3022

const app = express()

app.use(cors())
app.use(jsonParser)


app.get('/', (req: Request, res: Response) => {
    res.send({
        msg: 'Hello World!'
    })
})


app.post("/transcode", jsonParser, async (req: Request, res: Response) => {

    try {
        console.log(req.body);
        // get text in binary
        const {text, key} = req.body
        const encoded = await gamming(text, key)
        res.status(200).json({
            transcodedResult: encoded.join(" ")
        })
    } catch (e) {
        console.log(`Erroe`);
        console.trace(e)
        res.status(500).json({
            error: e
        })
    }
})
feisteilRoutes(app, jsonParser)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})