'use strict';
var mysql = require('mysql');

module.exports.init = function init(settings) {
  var pool = mysql.createPool(settings);

  return {
    getConnection: function(callback) {
      pool.getConnection(callback);
    },
    closeConnection: function(connection, callback) {
      // Using polled connections, this is synchronous
      // Using a simulated callback function in case we ever switch
      // to non-pooled connections or a different database.
      connection.release();
      process.nextTick(callback);
    }
  };
};
