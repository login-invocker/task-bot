const express = require('express')
const router = express.Router();
const server = express()
const config = require('./config.json')
var bodyParser = require('body-parser')
const cors = require('cors');

require("./models/task.js")
require("./models/user.model.js")

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cors())
server.options('*', cors())
// parse application/json
server.use(bodyParser.json())
server.use(express.static(__dirname + '/Views/static'));
const routerConfig = require('./Routers/index.js')

const connectDatabase = async () => {
  const mongoose = require('mongoose')
  try {
    const db = await mongoose.connect(process.env.DB_CONNECT || config.db, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 2000,
    })
    console.log('Connect to MongoDB!')

    return db
  } catch (err) {
    console.log('Could not connect to MongoDB!')
  }
}

const keepLive = async () => {
  await connectDatabase();
  server.listen(process.env.PORT || 8080, () => {
    console.log("bot is online")
  })
}

routerConfig.routers(router)
server.use('/', router);
module.exports = {
  keepLive
}