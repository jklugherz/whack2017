var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String
});

var professorSchema = mongoose.Schema({
  fname: String,
  lname: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: Review }],
  rating: Integer
});

var classSchema = mongoose.Schema({
  name: String,
  professor: [{ type: Schema.Types.ObjectId, ref: Professor }],
  title: String,
  department: String
});


User = mongoose.model('User', userSchema);
Professor = mongoose.model('Professor', professorSchema);
Class = mongoose.model('Class', classSchema);

module.exports = {
    User:User,
    Professor:Professor,
    Class:Class
};
