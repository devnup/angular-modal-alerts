var express = require('express');

var routes = require('./routes');
var filters = require('../filters');

/**
 * The main API express application, handles all controllers routes.
 *
 * @class
 * @author luiseduardobrito
 * @since 12/3/14.
 *
 * @alias com.devnup.warehouse.api.controllers
 */
var app = module.exports = express();

for(var method in routes) {
  for(var r in routes[method]) {
    if(routes[method][r].filters && routes[method][r].filters.length) {
      filters(r, routes[method][r].filters, app);
    }
    app[method](r, require(routes[method][r].controller));
  }
};

/**
 * The main API entities routes, handles all controllers routes
 *
 * @author luiseduardobrito
 * @since 12/3/14.
 *
 * @class
 * @alias com.devnup.warehouse.api.controllers.entities
 */
var entities = {};