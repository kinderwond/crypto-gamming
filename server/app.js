require("dotenv").config()
const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')

const { gamming } = require("./gamming")
const jsonParser = bodyParser.json()
const port = process.env.PORT || 3022

const app = express()

app.use(cors())
require("./feistel-network/feistel-network.routes")(app, jsonParser)
app.get('/', (req, res) => {
    res.send({
        msg: 'Hello World!'
    })
})


app.post("/transcode", jsonParser, async (req, res) => {

    try {
        console.log(req.body);
        // get text in binary
        const { text, key } = req.body
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})