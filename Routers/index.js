const homeRoute = require('./home-router.js')
const taskRoute = require('./task-router.js')
const userRouter = require('./user.router')
const vocabularyRouter = require('./vocabulary.router')

const routers = (router) => {
  homeRoute.getHome(router)
  taskRoute.createTask(router)
  taskRoute.getAllTask(router)
  taskRoute.deleteTask(router)
  taskRoute.updateTask(router)
  taskRoute.getTimeMatrix(router)
  taskRoute.getDataForBarChart(router)
  taskRoute.getTaskByDate(router)
  taskRoute.resetTask(router)

  userRouter.createUser(router)
  userRouter.login(router)
  vocabularyRouter.create(router)
  vocabularyRouter.list(router)
}

module.exports = {
  routers
} 