/**
 * Created by Igor.Suhoverhov on 11.04.2016.
 */
var TelegramBot = require('node-telegram-bot-api');
var token = '211353716:AAEUu013rJ5stdYkMtDtHl1vfmiyHfvHlPM';
var bot = new TelegramBot(token, {polling: true});

console.log('bot server started...');

var User = require('./libs/mongoose').User;

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);

    if (msg.text.indexOf("friend") == 1){
        var friendUserId =  msg.text.split(' ')[1];
        User.findOne({_id: friendUserId}, function (err, user) {
            if (!user) {
                bot.sendMessage(chatId, "К сожалению, пользователь ещё не обращался к боту. Необходимо, чтобы он добавился в систему.");
            }
            else {
                User.findOne({_id: chatId}, function (err, user) {
                    if (!user) {

                    }
                    else {
                        user.current_friend_id = friendUserId;
                        user.save(function (err, newUser) {
                            if (err) {
                                console.log("Something goes wrong with user " + newUser._id);
                            } else {
                                console.log("Data is updated for id" + newUser._id)
                            }
                        });
                    }

                });
            }
        });
    }
    else {

        User.findOne({_id: chatId}, function (err, user) {
            if (!user) {
                console.log('Not found');

                bot.sendMessage(chatId, "Привет, " + msg.chat.first_name + "! Твой ID " + chatId + " Передай его собеседнику! ");

                var newUser = new User({_id: chatId, first_name: msg.chat.first_name});
                newUser.save(function (err, newUser) {
                    if (err) {
                        console.log("Something goes wrong with user " + newUser._id);
                    } else {
                        console.log("Data is saved for id" + newUser._id)
                    }
                });
            }
            else {
                console.log('Found success');
                if (user.current_friend_id != null) {
                    bot.sendMessage(user.current_friend_id, msg.text);
                }
                else {
                    bot.sendMessage(chatId, "Привет, " + msg.chat.first_name + "! Давно не виделись, не желаешь с кем-нибудь пообщаться?");
                }
            }
        });
    }

});