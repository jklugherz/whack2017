var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Professor = models.Professor;

//////////////////////////////// PUBLIC ROUTES ////////////////////////////////
// Users who are not logged in can see these routes

router.get('/', function(req, res, next) {
  res.render('home');
});

///////////////////////////// END OF PUBLIC ROUTES /////////////////////////////

router.use(function(req, res, next){
  if (!req.user) {
    console.log("no user")
    console.log(req.user)
    res.redirect('/login');

  } else {
    return next();
  }
});

//////////////////////////////// PRIVATE ROUTES ////////////////////////////////
// Only logged in users can see these routes

router.get('/userpage', function(req, res, next) {
  res.render('userpage', {
    username: req.user.username,
  });
});

router.post('/addreview', function(req, res) {
  Professor.findOne({ lname: req.body.lastName, fname: req.body.firstName }, function(err, professor) {
    if (err) {
      console.log('error', err);
    } else {
      professor.reviews.push(req.body.comment);
      professor.save(function(err) {
        if (err) {
          console.log('error', err);
        } else {
          res.redirect('/professor/' + professor._id);
        }
      })
    }
  })
})

router.get('/professor/:id', function(req, res) {
  var profId = req.params.id;
  Professor.findById(profId, function(err, professor) {
    res.render('professorPage', {
      firstName: professor.fname,
      lastName: professor.lname,
      reviews: professor.reviews
    })
  })
})

// router.get('/class/:id', function(req, res) {
//   var classId = req.params.id;
//   Class.findById(classId, function(err, class) {
//     res.render('classPage', {
//       name: class.name,
//       reviews: class.reviews
//     })
//   })
// })





///////////////////////////// END OF PRIVATE ROUTES /////////////////////////////

module.exports = router;
