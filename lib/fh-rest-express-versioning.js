'use strict';

/**
 * Creates an express middleware instance that will determine which fh-rest
 * adapter should be used to serve an IncomingRequest
 * @param  {Object}   opts
 * @return {Function}
 */
module.exports = function getFhRestVersioner (opts) {

  var assert = require('assert')
    , log = require('./log');

  assert.equal(
    typeof opts.versions,
    'object',
    'opts.versions is required and must be an Object'
  );

  assert.notEqual(
    Object.keys(opts.versions).length,
    0,
    'opts.versions must contain at least one API version'
  );

  Object.keys(opts.versions).forEach(function (v) {
    // Deep check to confirm we have a router...a bit nasty
    assert.equal(
      opts.versions[v].name,
      'router',
      'opts.versions["' + v + '"] must be an instance of fh-rest-express-router'
    );
  });

  if (!opts.defaultVersion) {
    log.warn(
      'no default API version was specified. requests without a valid' +
      '"x-fh-rest-api-version" will fail with a HTTP 400 error'
    );
  } else {
    // Deep check to confirm we have a router...a bit nasty
    assert.equal(
      opts.defaultVersion.name,
      'router',
      'opts.defaultVersion must be an instance of fh-rest-express-router if ' +
      'provided'
    );
  }

  return function _serveFhRestRequestWithVersioning (req, res, next) {
    var reqVersion = req.headers['x-fh-rest-api-version'];

    if (reqVersion && opts.versions[reqVersion]) {
      log.trace('serving request using api version: %s', reqVersion);

      opts.versions[reqVersion](req, res, next);
    } else if (reqVersion && !opts.versions[reqVersion]) {
      log.trace('received request for unsupported api version %s', reqVersion);

      res.status(400).json({
        msg: 'unsupported API version requested: ' + reqVersion
      });
    } else if (opts.defaultVersion) {
      log.trace('using default adapter version');

      opts.defaultVersion(req, res, next);
    } else {
      res.status(400).json({
        msg: 'please specify an API version using the ' +
          '"x-fh-rest-api-version" header'
      });
    }
  };

};
