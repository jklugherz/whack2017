var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String
});

var professorSchema = mongoose.Schema({
  fname: String,
  lname: String,
  dept: String
});

var classSchema = mongoose.Schema({
  name: String,
  professor: [{ type: Schema.Types.ObjectId, ref: Professor }],
  title: String
})

User = mongoose.model('User', userSchema);
Professor = mongoose.model('Professor', professorSchema);
Class = mongoose.model('Class', classSchema);

module.exports = {
    User:User,
    Professor:Professor,
    Class:Class
};
