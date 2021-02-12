const homeRoute = require('./home-router.js')
const taskRoute = require('./task-router.js')
const routers = (router) => {
  homeRoute.getHome(router)
  taskRoute.createTask(router)
  taskRoute.getAllTask(router)
  taskRoute.deleteTask(router)
  taskRoute.updateTask(router)

}

module.exports = {
  routers
} 