const moment = require('moment')
const botDiscord = require('../bot.js')
const mongoose = require('mongoose')
const Task = mongoose.model('Task')
const schedule = require('node-schedule')
const scheduleJob = require('../schedule-job')
const config = require('../config.json');

const notiTask = async (bot) => {
  const taskText = await setTextNoti()
  const textChannel = bot.channels.cache.get(config.TASK_BOT_CHANNEL_ID)
  scheduleJob.alarmTask("notiTask", textChannel, taskText)
}

const setTextNoti = async (option) => {
  const tasks = await getAllTaskDB(option)
  let textNoti = []
  textNoti.push(`You have ${tasks.length} task: `)
  tasks.forEach(task => {


    textNoti.push(
      "``` \n" +
      `# ${task.title.toUpperCase()}
      - id:
        - ${task._id}
      - ${task.content}
      - Tạo vào ngày:
        - ${task.date}
      - Trạng thái công việc:
        - ${task.status ?
        "Đã hoàn thành" :
        "Chưa hoàn thành "}
    `
      + "```"
    )

  })

  textNoti.push(`
  - $done+Mã để đánh dấu hoàn thành.
  -  Tạo task tại: https://client-bot-discord.invocker.repl.co/`)
  return textNoti
}
const getAllTaskDB = async (option) => {
  if(option)
  return await Task.find(option).exec()
  return await Task.find().exec()
}


const updateSchedule = async () => {
  const notiTaskOld = schedule.scheduledJobs['notiTask']
  if (notiTaskOld != null)
    notiTaskOld.cancel()
  await notiTask(botDiscord.bot)
}

const getTasks = () => {
  // chỉ lấy task chưa hòan thành ngày hôm nay
  const option = {
    status: false,
    date: {
      $gte: moment().startOf('day').toDate(),
      $lte: moment().endOf('day').toDate()
    }
  }
  return setTextNoti(option);

}


const notiOnetask = (task) => {
  const textNoti = "``` \n" +
    `# ${task.title.toUpperCase()}
      - ${task.content}
      - Tạo vào ngày:
        -  ${task.date}
      - Trạng thái:
        -  ${task.status ?
      "Đã hoàn thành" :
      "Chưa hoàn thành "}
    `
    + "```"
  const textChannel = botDiscord.bot.channels.cache.get(config.TASK_BOT_CHANNEL_ID)
  return textChannel.send(textNoti);
}

module.exports = {
  notiTask,
  updateSchedule,
  getTasks,
  notiOnetask
}