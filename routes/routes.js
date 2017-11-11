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

router.post('/findprof', function(req, res) {
  Professor.findOne({ lname: req.body.lname, fname: req.body.fname }, function(err, professor) {
    if (err) {
      console.log('error', err);
    } else {
      res.redirect('/prof/' + professor._id)
    }
  })
})



///////////////////////////// END OF PRIVATE ROUTES /////////////////////////////

module.exports = router;
