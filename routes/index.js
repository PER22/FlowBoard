var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.redirect('/projects');
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email',],
    // Optionally force pick account every time
    // prompt: "select_account"
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
