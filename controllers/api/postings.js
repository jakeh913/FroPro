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
		awaitingMod: req.body.awaitingMod, 
		postStatus: req.body.postStatus,
		userPosted: req.body.userPosted,
		userID: req.body.userID,
		jobUniqueID: req.body.jobUniqueID,
		version: req.body.version
	 });
	 
    posting.save(function (err, posting) {
        if (err) { return next(err) };
        res.status(201).json(posting);
		console.log('you may have just been successful posting to DB');
    });
});

//testing to see whether I can make link to single posting
router.get('/:_id', function (req, res, next) { 
    Posting.findOne({_id: req.params._id}, function(err, posting){
	if(err){
	    return res.send(err);
	}
    res.json(posting);
    })
})
    



module.exports = router
