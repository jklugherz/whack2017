var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String
});

User = mongoose.model('User', userSchema);


var reviewSchema = mongoose.Schema({
  content: String,
  respect: Number,
  difficulty: Number,
  effectiveness: Number
});

Review = mongoose.model('Review', reviewSchema);


var professorSchema = mongoose.Schema({
  fname: String,
  lname: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: Review }]
});

Professor = mongoose.model('Professor', professorSchema);


module.exports = {
    User:User,
    Professor:Professor,
    Review:Review
};
