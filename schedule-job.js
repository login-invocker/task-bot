const schedule = require('node-schedule')
const config = require('./config.json');
const alarmTask = (id, textChannle, contentNoti) => {

  let rule = new schedule.RecurrenceRule();
  rule.hour = 05;
  rule.minute = 00;
  rule.tz = 'Asia/Saigon'

  schedule.scheduleJob(id, rule, () => {
    contentNoti.forEach(mess => {
      textChannle.send(mess);
    })
  })
}

const job = () => {
  schedule.scheduleJob('20 28 00 * * *', () => {
    // console.log("hello job")
  })
}

const resetTask = (cb) => {

  let rule = new schedule.RecurrenceRule();
  rule.hour = 1;
  rule.minute = 30;
  rule.tz = 'Asia/Saigon'

  const job = schedule.scheduleJob(config.ID_SCHEDULE, rule, ()=>{
    cb()
  })
}
module.exports = {
  alarmTask,
  job,
  resetTask
}