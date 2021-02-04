const schedule = require('node-schedule')
const meeting = (textChannle ,contentNoti) => {
    schedule.scheduleJob('00 30 00 * * *', ()=>{
        textChannle.send(contentNoti);
    })
}

const job = () => {
    schedule.scheduleJob('20 28 00 * * *', ()=>{
        console.log("hello job")
    })
    
}


module.exports = {
    meeting,
    job
}