const taskController = require('../Controller/task-controller.js')


const createTask = (router) => {
  router.post('/api/task', taskController.createTask)
}

const getAllTask = (router) => {
  router.get('/api/task', taskController.getAllTask)
}

const deleteTask = (router) => {
  router.delete('/api/task/:_id', taskController.deleteTask)
}

const updateTask = (router) => {
  router.put('/api/task/', taskController.updateTask)
}

module.exports = {
  createTask,
  getAllTask,
  deleteTask,
  updateTask
}