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

const getTimeMatrix = (router) => {
  router.get('/api/task/eisenhower', taskController.getTimeMatrix)
}

const getDataForBarChart = (router) => {
  router.post('/api/task/bar-chart', taskController.getDataForBarChart)
}

module.exports = {
  createTask,
  getAllTask,
  deleteTask,
  updateTask,
  getTimeMatrix,
  getDataForBarChart
}