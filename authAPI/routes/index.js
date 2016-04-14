var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var passport = require('passport');
var config = require('../../config');
var auth = jwt({
  secret: config.jwtSecretKey,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
//creating variable for req/res function to admin postings Post route
var ctrlAdminPost = require ('../controllers/adminPost');
//var ctrlPublicPostingsGet = require('../controller/finalPostingsGet');
var ctrlGetFinalPostings = require('../controllers/finalPostGet');
//Creating route to administrator post DB. The post route will only be available to user with admin privileges. The get route will be wide open.
router.post('/finalPostings', auth , ctrlAdminPost.checkUserRoleAndPost);

//this get route should be wide open
router.get('/finalPostings', ctrlGetFinalPostings.getPosts);


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//linkedin tries
router.get('/auth/linkedin', //FINISH THIS OR SERVER WON'T WORK -- LOOK AT PASSPORT-OAUTH APP
router.get('/auth/linkedin/callback', //FINISH THIS OR SERVER WON'T WORK
module.exports = router;
