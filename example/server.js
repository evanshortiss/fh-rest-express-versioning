'use strict';

var app = require('express')();

var versioner = require('../lib/fh-rest-express-versioning');

// Create a /example route that has two versions avaialble
app.use('/example', versioner({
  defaultVersion: require('./api/v2/router'),

  versions: {
    // A list of API versions. These are instances of fh-rest-express-router
    // and will be triggered based on the value of the header named
    // "x-fh-rest-api-version"
    v1: require('./api/v1/router'),
    v2: require('./api/v2/router')
  }
}));

app.listen(3001, function (err) {
  if (err) {
    throw err;
  }

  console.log('fh-rest-express-versioning example listening on 3001');
});
