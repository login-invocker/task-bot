const Discord = require("discord.js")
require('dotenv')
const config = require('./config.json');
let bot = new Discord.Client();
bot.login(process.env.AUTH_TOKEN);

module.exports.bot=bot