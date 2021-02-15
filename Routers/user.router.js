const userController = require('../Controller/user.controller.js')


const createUser = (router) => {
  router.post('/api/user', userController.create)
}

const login = (router) => {
  router.post('/api/user/login', userController.login)
}

// const deleteTask = (router) => {
//   router.delete('/api/task/:_id', taskController.deleteTask)
// }

// const updateTask = (router) => {
//   router.put('/api/task/', taskController.updateTask)
// }

// const getTimeMatrix = (router) => {
//   router.get('/api/task/eisenhower', taskController.getTimeMatrix)
// }

module.exports = {
    createUser,
    login
}