const path = require('path');

const homeController = (req, res) => {
 
  res.sendFile(path.join(`/home/runner/task-bot-server/Views/index.html`));
  //__dirname : It will resolve to your project folder.
}

module.exports = {
  homeController
}