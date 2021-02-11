const Discord = require("discord.js")
const config = require('./config.json');
let bot = new Discord.Client();
bot.login(config.token);

module.exports.bot=bot