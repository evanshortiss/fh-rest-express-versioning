# fh-rest-express-versioning

A versioning system for APIs built using fh-rest-express-router.

## Install

```
npm install fh-rest-express-versioning
```


## Usage

```js
var app = require('express')();
var versioner = require('fh-rest-express-versioning');

// Create a /users route that has two versions avaialble
app.use('/users', versioner({
  defaultVersion: require('./lib/routers/users/v1'),

  versions: {
    // A list of API versions. These are instances of fh-rest-express-router
    // and will be triggered based on the value of the header named
    // "x-fh-rest-api-version"
    v1: require('./lib/routers/users/v1'),
    v2: require('./lib/routers/users/v2')  
  }
}));
```


## Behaviours

In the example above we provided a list of key-value pairs, where the key
represents our API version, and the value is the *fh-rest-express-router* that
implements that version.

Incoming requests are routed based on the presence of an "x-fh-rest-api-version"
header. There are a few actions that can occur based on this header value:

* If the header exists, and matches a version name, then that version is used
* If the header exists, but does not match a version a 400 HTTP status is
returned
* If the header does not exist, then the _defaultVersion_ is used if the
_defaultVersion_ option is supplied
If the header does not exist, and _defaultVersion_ is not supplied, a HTTP 400
is returned


## Example

This repo includes an example server. You can run it by doing the following:

```
git clone git@github.com:evanshortiss/fh-rest-express-versioning.git
cd fh-rest-express-versioning
npm install
npm run example
```

Now you can run GET http://127.0.0.1/example to get JSON back. Try messing with the inclusion of the *x-fh-rest-api-version* header to alter behaviour. A sample Postman collection is also included in this repo to make this easier.
