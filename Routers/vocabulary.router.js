const vocabularyController = require('../Controller/vocabulary.controller')


const create = (router) => {
  router.post('/api/vocabulary', vocabularyController.create)
}

const list = (router) => {
  router.get('/api/vocabulary', vocabularyController.listVocabulary)
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
    create,
    list
}