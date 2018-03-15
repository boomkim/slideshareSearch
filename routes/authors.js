var express = require('express');
var router = express.Router();
var client = require('../config/elasticsearch')();
var pagination = require('pagination');

/* GET users listing. */
router.get('/:author', function(req, res, next) {
  if(req.query.page) var pageNum = req.query.page;
	else var pageNum = 1;
	var perPage = 10;
	var author = req.params.author;
  var searchParams = {
	  index: 'slideshare-*',
		from: (pageNum -1) * perPage,
		size: perPage,
		body: {
		  query: {
			  match: {
				  "Username": author
				}
			}
		}
	};

	client.search(searchParams, function (err,body){
	  if(err){
		  throw err;
	  }
          var paginator = pagination.create('search', {prelink:'/authors/'+author, current: pageNum, rowsPerPage: perPage, totalResult: body.hits.total});
	  var pages = paginator.render();
	  res.render('author',{
		  hits: body.hits.hits,
			page: pageNum,
			total: body.hits.total,
			pages: pages,
			author: author
	  });
	});
});

module.exports = router;
