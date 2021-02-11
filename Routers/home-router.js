const homeController = require('../Controller/home-controller.js')


const getHome = (router) => {
  router.get('/',homeController.homeController)
}

module.exports = {
  getHome
}