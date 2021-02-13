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
  await taskSchedule.updateSchedule(data)
  res.send({ code: 200, message: 'Success!!!' })
}

const deleteTask = async (req, res) => {
  const data = req.params

  try {
    await Task.deleteOne({
      _id: data._id
    })
    res.send({ code: 200, message: 'Success!!!' })
  } catch{
    res.send({ code: 510, message: "Erro delete" })
  }
}

const updateTask = async (req, res) => {
  const data = req.body
  const newTask = data.task
  try {
    await Task.updateOne({
      _id: newTask.id
    }, newTask)
    res.send({ code: 200, message: 'Success!!!' })
  } catch{
    res.send({ code: 201, message: "Cant not update" })
  }
}

const updateStatus = async (task) => {

  try {
    await Task.updateOne({
      _id: task.id
    }, {
        status: task.status
      })
    const taskById = await Task.findById(task.id).exec();
    taskSchedule.notiOnetask(taskById)
    return true
  } catch{
    return false
  }
}

const resetTask = async () => {
    const resuiltData = await Task.updateMany({}, {
    status: false
  })

  await taskSchedule.updateSchedule(data)
  return resuiltData.nModified
}
module.exports = {
  createTask,
  getAllTask,
  getAllTaskDB,
  deleteTask,
  updateTask,
  updateStatus,
  resetTask
}