var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    console.log('success connected!');
});

var UserSchema = new mongoose.Schema( {
    first_name: { type: String},
    current_friend_id: { type: String }
} );
var User = db.model("User",UserSchema);

//mongoose.connect('mongodb://localhost/friends');

mongoose.connect('mongodb://friend:Remington23@ds021010.mlab.com:21010/heroku_6tm7lzzs');

module.exports.User = User;