var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String
});

var professorSchema = mongoose.Schema({
  fname: String,
  lname: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: Review }]
});

var classSchema = mongoose.Schema({
  name: String,
  professor: [{ type: Schema.Types.ObjectId, ref: Professor }],
  title: String
  //department: String
  //overallRating: Integer
});

var reviewSchema = mongoose.Schema({
  content: String,
  class: String
});

User = mongoose.model('User', userSchema);
Professor = mongoose.model('Professor', professorSchema);
Class = mongoose.model('Class', classSchema);
Review = mongoose.model('Review', reviewSchema);

module.exports = {
    User:User,
    Professor:Professor,
    Class:Class,
    Review:Review
};
