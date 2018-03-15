module.exports = function(){
  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
    host: 'https://vpc-elasticsearch-elblog-m3dkwzyjrt7drt2kt67ygeggji.us-east-1.es.amazonaws.com',
    log: 'trace'
});
  return client;
}
