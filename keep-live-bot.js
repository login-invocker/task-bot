const express = require('express')

const server = express()

const keepLive = () => {
    server.listen(8080, () => {
        console.log("bot is online")
    })
}

module.exports = {
    keepLive
}