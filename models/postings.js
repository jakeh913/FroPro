var db = require('../db');
var mongoose = require('mongoose');
var uniqueID = mongoose.Types.ObjectId();
var postingInfo = db.Schema({
    title: { type: String, required: true },
    postingBody: { type: String, required: true },
	loc: { type: String, required: true },
	locationLat: { type: Number, required: false},
	locationLng: { type: Number, required: false},
	awaitingMod: { type: Number, required: true, default: 1},
	/*Awaiting Moderation: 1-Ready to Go, 0-Not awaiting action */
	postStatus: { type: Number, required: true, default: 1}, /*Status: 1-Live (awaiting moderation or live), 0-Inactive (not posted AND not awaiting moderation), 2-denied */
	date: { type: Date, required: true, default: Date.now },
	userPosted: { type: String, default: 'None', required: true },
	userID: {type: String, required: false},
	jobUniqueID: {type: String, default: uniqueID, required: false, unique: true},
	version: {type: Number, required: true},
	
})
	
var Posting = db.model('Posting', postingInfo);
	

module.exports = Posting
