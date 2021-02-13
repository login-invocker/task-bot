const Discord = require("discord.js")
require('dotenv')
const config = require('./config.json');
let bot = new Discord.Client();
bot.login(process.env.AUTH_TOKEN || 'ODA2MjE1NTc5NDU0Mjc1NjY2.YBmMxA.NXNp5cQTNqX-16pza5xLJ4aZ3s0');

module.exports.bot = bot