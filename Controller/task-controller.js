const mongoose = require('mongoose')
const Task = mongoose.model('Task')

const taskSchedule = require('../Tasks/my-task.js')

const getAllTaskDB = async () => {
  const taskData = await Task.find().exec()
  return taskData
}

const getAllTask = async (req, res) => {
  const tasks = await getAllTaskDB()
  res.json(tasks)
}
const createTask = async (req, res) => {
  const data = req.body 
  const task = new Task({
    title: data.title,
    content: data.content,
    date: new Date()
  })

  await task.save()
  await taskSchedule.addTask(data)
  res.send({code: 200, message: 'Success!!!'})
}

const deleteTask = async (req, res) => {
  const data = req.body 
  try{
    await Task.deleteOne({
      _id: data._id
    })
    res.send({code: 200, message: 'Success!!!'})
  }catch{
    res.send({code: 510, message: "Erro delete"})
  }
}
module.exports = {
  createTask,
  getAllTask,
  getAllTaskDB,
  deleteTask
}