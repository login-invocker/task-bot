const Discord = require("discord.js")
const config = require('./config.json');
const PREFIX = '$'
var bot = new Discord.Client();

bot.on('ready', function(){
    console.log("bot is now online");
   
})

bot.on("message", async message => {
    if (message.author.equals(bot.user)) return;
    var args = message.content.substring(PREFIX.length).split(" ")
    if (!message.content.startsWith(PREFIX)) return;
   switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.send("pong!");
            break;
        case "hi":
            message.channel.send("hi");
            break;
    }
  
})

 bot.login(config.token);