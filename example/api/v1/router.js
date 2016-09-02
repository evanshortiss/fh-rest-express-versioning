'use strict';

module.exports = require('fh-rest-express-router')({
  name: 'users-v1',
  adapter: require('./adapter')
});
