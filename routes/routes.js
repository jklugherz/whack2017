var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Professor = models.Professor;
var Review = models.Review;

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

router.get('/addprofreview', function(req, res) {
  res.render('profReview');
})

router.post('/addprofreview', function(req, res) {
  Professor.findOne({ lname: req.body.lastName.toUpperCase(), fname: req.body.firstName.toUpperCase() }, function(err, professor) {
    if (err) {
      console.log('error', err);
    } else {
      var profReview = new Review({
        content: req.body.comment,
        respect: req.body.respect,
        difficulty: req.body.difficulty,
        effectiveness: req.body.effective
      });

      profReview.save(function(err) {
        if (err) {
          console.log('error', err)
        }
      })
      .then(() => {
        professor.reviews.push(profReview);
        professor.save(function(err) {
          if (err) {
            console.log('error', err);
          } else {
            res.redirect('/professor/' + professor._id);
          }
        })
      })
    }
  })
})

router.get('/professor/:id', function(req, res) {
  var profId = req.params.id;
  Professor.findById(profId)
    .then((professor) => {
      const reviews = professor.reviews.map(function(review) {
        return Review.findById(review)
      })
      return Promise.all(reviews)
        .then((allReviews) => {
          //put algorithm here to find the totals?
          res.render('professorPage', {
            firstName: professor.fname,
            lastName: professor.lname,
            reviews: allReviews
          })
        })
    })
})


router.get('/profsearch', function(req, res) {
  res.render('searchPage');
})

router.post('/profsearch', function(req, res) {
  Professor.findOne({ lname: req.body.lastName.toUpperCase(), fname: req.body.firstName.toUpperCase() })
  .then((professor) => {
    res.redirect('/professor/' + professor._id)
  })
})




///////////////////////////// END OF PRIVATE ROUTES /////////////////////////////

module.exports = router;
