module.exports = function(){
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

  return client;
}
