var publicPosting = require('../models/publicPosting');

module.exports.getPosts = function (req, res, next) { 
    publicPosting.find()
   // .sort('date')
    .aggregate.group({
		jobUniqueID:"$jobUniqueID", 
		title: {$first: "$title"}, 
		postingBody: {$first:"$postingBody"}, 
		loc: {$first:"$loc"}, 
		locationLat: {$first:"$locationLat"}, 
		locationLng:{$first:"$locationLng"}, 
		awaitingMod: {$first:"$awaitingMod"}, 
		postStatus: {$first:"$postStatus"}, 
		date: {$first:"$date"}, 
		userPosted:{$first:"$userPosted"}, 
		userID:{$first:"$userID"},
		version: {$first: "$version"} 
	    })
    .exec( function (err, postings) {
	if (err) { console.log('error!') };
	res.json(postings);
	
	console.log('successful at getting final posts');
//    })
    });
}

