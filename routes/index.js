var express = require('express');
var router = express.Router();
const passport = require('passport');

// Route for the landing page
router.get('/', function(req, res) {
  // If user is logged in, redirect to projects index
  if (req.user) {
    res.redirect('/projects');
  }

  // Otherwise, render the signup page
  res.render('landing', { title: 'Sign up' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email',],
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/projects',
    failureRedirect: '/projects'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/projects');
  });
});

module.exports = router;
