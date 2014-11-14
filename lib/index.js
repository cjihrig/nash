'use strict';
var handlers = require('./handlers');
var database = require('./database');

module.exports.database = database;

module.exports.registerRoutes = function registerRoutes(server) {
  server.route([
    {
      method: 'GET',
      path: '/',
      config: {
        pre: [connectionPrereq],
        handler: handlers.home
      }
    }
  ]);
};

module.exports.registerExtensions = function registerExtensions(server) {
  server.ext('onPreResponse', function(request, reply) {
    var connection = request.pre.connection;

    if (!connection) {
      return reply();
    }

    request.server.settings.app.db.closeConnection(connection, function(err) {
      if (err) {
        // Handle error
      }

      reply();
    });
  });
};

var connectionPrereq = {
  assign: 'connection',
  method: function connectionPrereq(request, reply) {
    var db = request.server.settings.app.db;

    db.getConnection(function(err, connection) {
      if (err) {
        // Handle error
      }

      reply(connection);
    });
  }
};
