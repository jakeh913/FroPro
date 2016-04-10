var db = require('../../db');
var mongoose = require('mongoose');
var publicPostingInfo = new db.Schema({
    title: { type: String, required: true },
    postingBody: { type: String, required: true },
	loc: { type: String, required: true },
	locationLat: { type: Number, required: false},
	locationLng: { type: Number, required: false},
	awaitingMod: { type: Number, required: true},
	/*Awaiting Moderation: 1-Ready to Go, 0-Not awaiting action */
	postStatus: { type: Number, required: true }, /*Status: 1-Live (awaiting moderation or live), 0-Inactive (not posted AND not awaiting moderation), 2-denied */
	date: { type: Date, required: true  },
	userPosted: { type: String,  required: true },
	userID: {type: String, required: false},
	jobUniqueID: {type: String,  required: false},
	version: {type: Number, required: true}, 
	dateUpdated: {type: Date, required: true, default: Date.now}
	
})
	
var publicPosting = db.model('publicPosting',publicPostingInfo);
	

module.exports = publicPosting
