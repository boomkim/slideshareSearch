var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'https://vpc-elasticsearch-elblog-m3dkwzyjrt7drt2kt67ygeggji.us-east-1.es.amazonaws.com',
  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.params)
  if(req.query.q){
    client.search({
      q: req.query.q
    }).then(function (body) {
      var hits = body.hits.hits;
      res.render('index',{title:'Express', hits:hits});
    }, function (error) {
      console.trace(error.message);
    }); 
  }else{
    res.render('index',{title:'Express'});
  }
});

module.exports = router;
