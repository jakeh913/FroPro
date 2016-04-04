var mongoose = require('mongoose');
var db = require('../../db');
var User = mongoose.model('User');
var publicPosting = require('../models/publicPosting');

module.exports.checkUserRoleAndPost = function(req, res, next) {

  if (!req.payload._id) {
    console.log("made it here1!");
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        if (user.role != 'admin'){
	    console.log('made it here2!');
	    res.status(401).json({
		"message" : "UnauthorizedError: Not Admin User"
	    });
	}
	var publicPosting = new publicPosting({ 
		title: req.body.title,
		postingBody: req.body.postingBody,
		loc: req.body.loc,
		locationLat: req.body.locationLat,
		locationLng: req.body.locationLng,
		awaitingMod: req.body.awaitingMod, 
		postStatus: req.body.postStatus,
		userPosted: req.body.userPosted,
		userID: req.body.userID,
		jobUniqueID: req.body.jobUniqueID,
		version: req.body.version
	});
	 
	publicPosting.save(function (err, posting) {
	    if (err) { return next(err) };
	    res.status(201).json(publicPosting);
	    console.log('you may have just been successful posting to public posting DB as admin');
    });

      });
  }

};
