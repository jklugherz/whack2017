var mongoose = require('mongoose');
var models = require('./models');
var Professor = models.Professor;

mongoose.connect('mongodb://whack:whack@ds259085.mlab.com:59085/whack2017');
var course = require('./info');

course.Data.forEach(seedProf);

function seedProf (item, index) {
  var profName = item["Professor(s)"]
  var first = profName.split(/\s+/g)[0];
  var last = profName.split(/\s+/g)[1];
  Professor.find({fname: first, lname: last}, function (err, profs) {
      if(profs.length == 0) {
        var prof = new Professor({ fname:first, lname:last, reviews: [], rating: 0});
        prof.save(function (err, prof) {
          if (err) return console.error(err);
        });
      }
  });



}
