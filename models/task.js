const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema({
  title: String,
  content: String,
  date: Date,
  status: { 
    type: Boolean, 
    default: false
  }
})

mongoose.model('Task', Task)
