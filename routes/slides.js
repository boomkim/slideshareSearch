var express = require('express');
var router = express.Router();
var client = require('../config/elasticsearch')();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  client.search({
		index: 'slideshare-*',
		q: 'ID:'+req.params.id,
		}, function (err, body){
			console.log(body);
			res.render('slides',{doc:body.hits.hits[0]});
  });
});

module.exports = router;

