var express = require('express');
var router = express.Router();
var path = require('path');


router.use(express.static(__dirname + '/../assets'));
router.use(express.static(__dirname + '/../partials'));
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../layouts/', 'index.html'));
   
});

module.exports = router;