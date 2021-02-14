const mongoose = require('mongoose')
const Task = mongoose.model('Task')
const taskSchedule = require('../Tasks/my-task.js')

const getAllTaskDB = async (query) => {

  if(query)
    return await Task.find(query).exec()
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
  const queryModelTask = {
    isModel: true
  }
  const modelTask = await getAllTaskDB(queryModelTask)
  const newTask = modelTask.map( task => {task.status = false; return task})

  //Nếu tồn tại task mẫu thì sẽ tạo task mẫu hôm đó
  if(newTask){
    for(let i = 0; i < newTask.length; i++){
      await Task.create({
        title: newTask[i].title,
        content: newTask[i].content
      })
    }

    taskSchedule.updateSchedule()
  }
  else{
    
  }
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