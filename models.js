var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String
});

User = mongoose.model('User', userSchema);


var professorSchema = mongoose.Schema({
  fname: String,
  lname: String,
  reviews: [String],
  rating: Number
});

Professor = mongoose.model('Professor', professorSchema);


var classSchema = mongoose.Schema({
  name: String,
  professor: [{ type: Schema.Types.ObjectId, ref: Professor }],
  title: String,
  department: String
});


//Class = mongoose.model('Class', classSchema);

module.exports = {
    User:User,
    Professor:Professor,
    //Class:Class
};
