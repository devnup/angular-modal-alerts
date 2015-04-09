/**
 * Handles connection filters and limits in Express middleware
 *
 * @class
 * @constructor
 * @alias com.devnup.warehouse.api.Filter
 *
 * @since 12/3/14
 *
 * @param {String} route The URL route to bind controller and its filters
 * @param {String[]} filters The filter array list
 * @param {express.app} app Express application to bind route
 */
var FiltersWrapper = function (route, filters, app) {
  filters.map(function (name) {
    app.use(route, require('./' + name));
  });
};

// Export module constructor
module.exports = FiltersWrapper;
