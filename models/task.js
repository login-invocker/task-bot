const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema({
  title: String,
  content: String,
  date: Date
})

mongoose.model('Task', Task)
