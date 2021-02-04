const Discord = require("discord.js")
const scheduleJob = require('./schedule-job')
const schedule = require('node-schedule')

const config = require('./config.json');
const PREFIX = '$'
const keepBotLive = require('./keep-live-bot')
keepBotLive.keepLive()
var bot = new Discord.Client();

scheduleJob.job()
bot.on('ready', function(){
    console.log(`Bot ready, logged in as ${bot.user.tag}!`);
    const textChannel = bot.channels.cache.get(config.channelTestBot)
    
    scheduleJob.meeting(textChannel, config.metting_content)
})

bot.on("message", async message => {
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
    }
  
})

 bot.login(config.token);