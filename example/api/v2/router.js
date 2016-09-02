'use strict';

module.exports = require('fh-rest-express-router')({
  name: 'users-v2',
  adapter: require('./adapter')
});
