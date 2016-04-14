var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../../config');
console.log(config.LinkedIn_ID);
console.log(config.LinkedIn_Secret);

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

passport.use(new LinkedInStrategy({
	consumerKey: config.LinkedIn_ID,
	consumerSecret: config.LinkedIn_Secret, 
	callbackURL: "http://127.0.0.1:9001/authAPI/auth/linkedin/callback"
	},
	function(token, tokenSecret, profile, done){
		User.findOrCreate({ linkedinID: profile.id }, function (err, user) {
				return done(err, user);
		});	
	}
));
	
