'use strict';
module.exports.home = function home(request, reply) {
  var db = request.server.settings.app.db;
  var connection = request.pre.connection;

  // Once the database is setup, data can be retrieved from it
  reply({msg: 'Hello!'});
};
