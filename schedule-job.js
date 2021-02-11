const schedule = require('node-schedule')
const alarmTask = (id, textChannle ,contentNoti) => {
    schedule.scheduleJob(id, ' */59 * * * *', ()=>{
        contentNoti.forEach(mess=> {
          textChannle.send(mess);
        })
    })
}

const job = () => {
    schedule.scheduleJob('20 28 00 * * *', ()=>{
        console.log("hello job")
    })
}

module.exports = {
    alarmTask,
    job
}