var Posting = require('../../models/postings');
var router = require('express').Router();


router.get('/', function (req, res, next) { 
	Posting.find()
    .sort('-date')
    .exec(function (err, postings) {
        if (err) { return next(err) };
        res.json(postings);
		console.log('successful at getting posts');
    })
    
});


router.post('/', function (req, res, next) {
    var posting = new Posting({ 
		title: req.body.title,
		postingBody: req.body.postingBody,
		loc: req.body.loc,
		locationLat: req.body.locationLat,
		locationLng: req.body.locationLng,
		awaitingMod: 1, 
		postStatus: 0
	 });
	 
    posting.save(function (err, posting) {
        if (err) { return next(err) };
        res.status(201).json(posting);
		console.log('you may have just been successful posting to DB');
    });
});

module.exports = router