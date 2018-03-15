var express = require('express');
var router = express.Router();
var client = require('../config/elasticsearch');
var pagination = require('pagination');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.q){
    if(req.query.page) pageNum = req.query.page;
    else pageNum = 1;
    var perPage = 10;
    var userQuery = req.query.q;
    var searchParams = {
      index: 'slideshare-*',
      from: (pageNum - 1) * perPage,
      size: perPage,
      body: {
        query: {
          multi_match: {
	    "query": userQuery,
            "fields": ["Title","Description","Username"]
          }
        }
      }
    };

    client.search(searchParams, function (err, body) {
      if (err) {
        // handle error
        throw err;
      }
      var paginator = pagination.create('search', {prelink:'/?q='+req.query.q, current: pageNum, rowsPerPage: perPage, totalResult: body.hits.total});
      var pages2 = paginator.render();
      res.render('index', {
        hits: body.hits.hits,
        page: pageNum,
        total: body.hits.total,
        pages: Math.ceil(body.hits.total / perPage),
        pages2: pages2,
	q: req.query.q
      });
    });
  }else{
    res.render('index',{title:'Express'});
  }
});

module.exports = router;      


