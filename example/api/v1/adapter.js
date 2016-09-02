'use strict';

module.exports = {
  list: function (params, callback) {
    callback(null, {
      'item-#1': {
        text: 'I\'m from the v1 API'
      }
    });
  }
};
