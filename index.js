'use strict';
var path = require('path');
var hapi = require('hapi');
var lib = require('./lib');
var config = Object.freeze(require('./config'));
var port = process.env.PORT || config.port;

var main = function main() {
  var server = new hapi.Server(port, {
    app: {
      root: __dirname,
      db: lib.database.init(config.database)
    }
  });

  // Register views

  // Register plugins

  // Register routes
  lib.registerRoutes(server);

  // Register extension points
  lib.registerExtensions(server);

  // Start the server
  server.start(function start() {
    console.log('Server started at ' + server.info.uri);
  });
};

main();
