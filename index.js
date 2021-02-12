const bot = require('./bot.js')
const config = require('./config.json');
const PREFIX = '$'
const keepBotLive = require('./keep-live-bot')
keepBotLive.keepLive()
const myTask = require("./Tasks/my-task")
const taskController = require('./Controller/task-controller.js')
bot.bot.on('ready', function() {
  myTask.notiTask(bot.bot)
})

bot.bot.on("message", async message => {
  if (message.author.equals(bot.user)) return;
  var args = message.content.substring(PREFIX.length).split(" ")
  if (!message.content.startsWith(PREFIX)) return;
  switch (args[0].toLowerCase()) {
    case "ping":
      message.channel.send("pong!");
      break;
    case "hop-chua?":
      message.channel.send("@everyone Đến h họp rùi nha.");
      break;
    case "tasks":
      const textTask = await myTask.getTasks();
      textTask.forEach(mess => {
        message.channel.send(mess);
      })
      break;
    case "done":
      const task = {
        id: args[1],
        status: true
      }
      await taskController.updateStatus(task)
      break;
  }

})

