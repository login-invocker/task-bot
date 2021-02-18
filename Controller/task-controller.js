const mongoose = require('mongoose')
const Task = mongoose.model('Task')
const taskSchedule = require('../Tasks/my-task.js')
const helper = require('../helper.js')
const moment = require('moment-timezone')

const getAllTaskDB = async (options) => {

  if (options)
    return await Task.find(options.query, options.properties).exec()
  else
    return await Task.find().exec()
}

const getAllTask = async (req, res) => {
  const tasks = await getAllTaskDB()
  res.json(tasks)
}
const createTask = async (req, res) => {
  const data = req.body

  const task = new Task(data)
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
  const query = {
    isModel: true
  }
  const properties = 'title content isImportant isEmergency'
  const options = {
    query,
    properties
  }
  const modelTask = await getAllTaskDB(options)
  const newTask = modelTask.map(task => { task.status = false; return task })

  //Nếu tồn tại task mẫu thì sẽ tạo task mẫu hôm đó
  if (newTask) {
    await Task.create(newTask)
    for (let i = 0; i < newTask.length; i++) {
      await Task.create({
        title: newTask[i].title,
        content: newTask[i].content,
        isImportant: newTask[i].isImportant,
        isEmergency: newTask[i].isEmergency
      })
    }

    taskSchedule.updateSchedule()
  }
  else {

  }
}

const getTimeMatrix = async (req, res) => {
  const options = {
    query: {
      date: {
        $gte: moment().tz('Asia/Saigon').startOf('day').toDate(),
        $lte: moment().tz('Asia/Saigon').endOf('day').toDate()
      }
    }
  }
  const todayTasks = await getAllTaskDB(options)
  if (todayTasks) {
    const matrixTask = helper.timeEisenhowerManager(todayTasks)
    return res.json(matrixTask)
  } else {
    res.status(404).send({ message: "No Data" })
    return
  }

}

const getDataForBarChart = async (req, res) => {
  const data = req.body


  const dateRanger = {
    startDate: data.startDate || moment(new Date()).startOf('week').startOf('day').toDate(),
    endDate: data.endDate || moment(new Date()).endOf('week').endOf('day').toDate()
  }

  const optionsAllTask = {
    query: {
      date: {
        $gte: dateRanger.startDate,
        $lte: dateRanger.endDate
      }
    }
  }

  const listTask = await getAllTaskDB(optionsAllTask)
  if (listTask && listTask.length > 0) {
    const matrixTask = helper.dataForBarChar(listTask, dateRanger)

    return res.json(matrixTask)
  } else {
    res.status(404).send({ message: "No Data" })
    return
  }

}

const getTaskByDate = async (req, res) => {
  const data = req.body

  const options = {
    query: {
      date: {
        $gte: moment(data.date).tz('Asia/Saigon').startOf('day').toDate(),
        $lte: moment(data.date).tz('Asia/Saigon').endOf('day').toDate()
      }
    }
  }
  const listTask = await getAllTaskDB(options)
  if (listTask && listTask.length > 0) {
    return res.json(listTask)
  } else {
    res.status(404).send({ message: "No Data" })
    return
  }
}
module.exports = {
  createTask,
  getAllTask,
  getAllTaskDB,
  deleteTask,
  updateTask,
  updateStatus,
  resetTask,
  getTimeMatrix,
  getDataForBarChart,
  getTaskByDate
}