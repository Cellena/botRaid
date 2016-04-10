var TelegramBot = require('node-telegram-bot-api');
var token = '211353716:AAEUu013rJ5stdYkMtDtHl1vfmiyHfvHlPM';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  console.log(msg);
  bot.sendMessage(chatId, "Привет!", {caption: "Я твой бот!"});
});