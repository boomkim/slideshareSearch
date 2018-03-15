var express = require('express');
var router = express.Router();
var client = require('../config/elasticsearch')();

/* GET users listing. */
router.get('/:author', function(req, res, next) {
  res.render('author');
});

module.exports = router;
