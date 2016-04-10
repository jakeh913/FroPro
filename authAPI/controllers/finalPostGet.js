var publicPosting = require('../models/publicPosting');
var _ = require('lodash');

module.exports.getPosts = function (req, res, next) { 
    publicPosting.find()
   // .sort('date')
   // .aggregate().group({
//		jobUniqueID:"$jobUniqueID" 
	//	title: {$first: "$title"}, 
	//	postingBody: {$first:"$postingBody"}, 
	//	loc: {$first:"$loc"}, 
	//	locationLat: {$first:"$locationLat"}, 
	//	locationLng:{$first:"$locationLng"}, 
	//	awaitingMod: {$first:"$awaitingMod"}, 
	//	postStatus: {$first:"$postStatus"}, 
	//	date: {$first:"$date"}, 
	//	userPosted:{$first:"$userPosted"}, 
	//	userID:{$first:"$userID"},
	//	version: {$first: "$version"} 
//	    })
    .exec( function (err, postings) {
	var posting3 = [] ; 
	var sorted = {};
	if (err) { console.log('error!') };
	var posting2 = _.groupBy(postings,'jobUniqueID');
	for (var key in posting2)
	    {	var sorted = _.sortBy(posting2[key],function(o){return o.dateUpdated;} ); 
		var sorted = sorted.reverse(); 		
		posting3.push(sorted[0]);

	    }
	    	    
	res.json(posting3);
	console.log(sorted);
	console.log('successful at getting final posts');
//    })
    });
}

