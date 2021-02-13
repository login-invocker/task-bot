const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema({
  title: String,
  content: String,
  date: {
    type: Date,
    default: new Date()
  },
  status: {
    type: Boolean,
    default: false
  },
  isModel: {
    type:Boolean,
    default:false
  },
  isImportant: Boolean,
  isEmergency: Boolean
})

mongoose.model('Task', Task)
