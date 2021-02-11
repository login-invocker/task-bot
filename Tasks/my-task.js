const botDiscord = require('../bot.js')
const mongoose = require('mongoose')
const Task = mongoose.model('Task')
const schedule = require('node-schedule')
const scheduleJob = require('../schedule-job')
const config = require('../config.json');

const notiTask =  async (bot) => {
  const taskText = await setTextNoti()
  const textChannel = bot.channels.cache.get(config.TASK_BOT_CHANNEL_ID)
    scheduleJob.alarmTask("notiTask", textChannel, taskText)  
}

const setTextNoti = async () => {
 const tasks = await getAllTaskDB()
 let textNoti = []
 textNoti.push(`Your task:`)
  tasks.forEach(task => {

   
    textNoti.push(
    "``` \n"+
    `# ${task.title.toUpperCase()}
      - ${task.content}
      - Tạo vào ngày:
        - ${task.date}
    `
    + "```"
    )
  
})

  textNoti.push(`
  - $done+Mã để đánh dấu hoàn thành.
  -  Tạo task tại: https://client-bot-discord.invocker.repl.co/`)
  return textNoti
}
const getAllTaskDB = async () => {
  
  const tasks =  Task.find({}).exec()
  return tasks
}


const addTask = async (task) => {
  const notiTaskOld = schedule.scheduledJobs['notiTask']
  if (notiTaskOld != null)
  notiTaskOld.cancel()
  await notiTask(botDiscord.bot)
}

const getTasks = () => {
  return setTextNoti();
  
}
module.exports = {
  notiTask,
  addTask,
  getTasks
}