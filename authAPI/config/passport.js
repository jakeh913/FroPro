var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../../config');

passport.use(new LinkedInStrategy({
	clientID: config.LinkedIn_ID,
	clientSecret: config.LinkedIn_Secret,
	callbackURL: 'http://127.0.0.1:9001/authAPI/auth/linkedin/callback',
	scope: ['r_emailaddress', 'r_basicprofile']
},
function(accessToken, refreshToken, profile, done){console.log('oauthsuccess!')}));


passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

	
