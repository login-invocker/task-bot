const schedule = require('node-schedule')
const config = require('./config.json');
const alarmTask = (id, textChannle, contentNoti) => {
  schedule.scheduleJob(id, ' */59 * * * *', () => {
    contentNoti.forEach(mess => {
      textChannle.send(mess);
    })
  })
}

const job = () => {
  schedule.scheduleJob('20 28 00 * * *', () => {
    console.log("hello job")
  })
}

const resetTask = (cb) => {

  let date = new Date("Fri Feb 12 2021 23:58:47 GMT+0700")
  date.setHours(23);
  date.setMinutes(58);

	let rule = new schedule.RecurrenceRule();
	rule.second =  date.getSeconds();
	rule.hour = date.getHours();
	rule.minute = date.getMinutes();
  const job = schedule.scheduleJob(config.ID_SCHEDULE, rule, db)
}
module.exports = {
  alarmTask,
  job,
  resetTask
}