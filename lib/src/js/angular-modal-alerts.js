/**
 * Angular Modal Alerts.
 * v0.0.1
 *
 * @alias com.devnup.alert
 *
 * @author luis@devnup.com
 * @since 03/02/15.
 */
angular.module('com.devnup.alert', [])

  .factory('templateEngine', [
    '$http', '$templateCache', '$compile',

    function ($http, $templateCache, $compile) {

      /**
       * Inject a HTML template inside an element
       *
       * @param {Object} input The input object
       * @param {HTMLElement|String} input.element The HTML element or its selector for jqLite
       * @param {String} input.templateUrl The url for the template HTML file
       * @param {Function} input.success The url for the template HTML file
       * @param {Boolean} [input.replace] If true, replace element for content, if not append it. Default: false.
       */
      return function (input) {

        // Check if element is a string
        if (typeof input.element === typeof "string") {
          input.element = angular.element(input.element);
        }

        // Gets the element scope
        var scope = input.element.scope();

        // Downloads the HTML and injects it
        $http
          .get(input.templateUrl, {
            cache: $templateCache
          })
          .success(function (tplContent) {

            if (!!input.replace) {
              input.element.replaceWith($compile(tplContent)(scope));
            } else {
              input.element.html($compile(tplContent)(scope));
            }

            if (input.success) {
              input.success(input.element);
            }
          });
      }
    }])

  .factory('$alert', [

    '$rootScope', 'templateEngine',

    /**
     * Angular Alerts Service.
     *
     * @class
     * @type {Function}
     * @alias com.devnup.alert.$alert
     */
      function ($rootScope, templateEngine) {

      var cache = {};

      /**
       * Constructs and open a new modal
       *
       * @param {String} type The modal type.
       * @param {Object} [input] The input object for the modal with the override configuration.
       * @returns {Object} The full configuration object cached for the opened modal
       */
      var constructor = function (type, input) {

        // Set cache object
        cache[type] = input;

        // Switch based on modal type
        switch (type) {

          case 'modal':

            templateEngine({

              element: '#alert-custom-body',
              templateUrl: input.url || input.templateUrl,

              success: function () {
                angular
                  .element('#alert-custom')
                  .addClass('open');
              }
            });

            break;

          // Success modal
          case 'success':

            angular
              .element('#alert-success')
              .addClass('open');

            break;

          // Warning modal
          case 'warning':

            angular
              .element('#alert-warning')
              .addClass('open');

            break;

          // Danger modal
          case 'danger':

            angular
              .element('#alert-danger')
              .addClass('open');

            break;

          // Error modal
          case 'error':

            angular
              .element('#alert-error')
              .addClass('open');

            break;

          // info modal
          case 'info':

            angular
              .element('#alert-info')
              .addClass('open');

            break;

          // Input modal
          case 'input':

            angular
              .element('#alert-input')
              .addClass('open');

            break;

          // Loading modal
          case 'loading':

            angular
              .element('#alert-loading')
              .addClass('open');

            angular
              .element('#alert-loading-img')
              .attr('src', input.image || 'assets/img/loader.gif');

            break;

          // Default: do nothing
          default:
            break;
        }

        return cache[type];
      };

      // The service public interface
      var methods = {

        /**
         * Initializer constructor, should not be called directly outside angular-modal-alerts module.
         *
         * @alias com.devnup.alert.$alert#init
         *
         * @param {String} type The alert type
         * @returns {{}} The instance created and cached
         */
        init: function (type) {
          return cache[type];
        },

        /**
         * Configure default values for the alerts
         *
         * @alias com.devnup.alert.$alert#config
         *
         * @param {Object} input The configuration object
         * @param {Object} input.loading The loading spinner configuration object
         * @param {String} [input.loading.image] The URL for the loading spinner image.
         * @param {String} [input.loading.alt] The alt value for the loading spinner image.
         * @param {Object} [input.loading.style] The style object for the loading spinner image.
         * @param {String|Number} [input.loading.style.width] The width value for the loading spinner image. Default: 50px.
         * @param {String|Number} [input.loading.style.height] The height value for the loading spinner image. Default: 50px.
         * @returns {{}} The instance created and cached
         */
        config: function (input) {

          if (input && input.preloader) {
            console.error('angular modal alerts: Preloader deprecated, ignoring...');
            delete input.preloader;
          }

          if (input && Object.keys(input).length) {
            for (var k in input) {
              if (input.hasOwnProperty(k)) {
                cache[k] = input[k] || cache[k];
              }
            }
          }

          return cache;
        },

        /**
         * Create a new custom modal.
         *
         * @alias com.devnup.alert.$alert#modal
         *
         * @param {{}} input The input for the modal
         * @param {String} input.templateUrl The modal HTML template file URL
         * @param {String} input.title The modal title
         * @param {String} input.icon The class to set the icon. Ex: "fa fa-info" for FontAwesome Info icon.
         * @returns {Object} The full configuration object cached for the modal
         */
        modal: function (input) {
          return constructor('modal', input);
        },

        /**
         * Create a new info alert.
         *
         * @alias com.devnup.alert.$alert#info
         *
         * @param {{}} input The input for the alert
         * @param {String} input.title The alert title
         * @param {String} input.message The alert message
         * @param {Function} [input.ok] The callback for the OK button click
         * @param {String} [input.button] The alert buttons configurations
         * @param {String} [input.button.ok] The label for the OK button
         * @returns {Object} The full configuration object cached for the modal
         */
        info: function (input) {
          return constructor('info', input);
        },

        /**
         * Create a new success alert.
         *
         * @alias com.devnup.alert.$alert#success
         *
         * @param {{}} input The input for the alert
         * @param {String} input.title The alert title
         * @param {String} input.message The alert message
         * @param {Function} [input.ok] The callback for the OK button click
         * @param {String} [input.button] The alert buttons configurations
         * @param {String} [input.button.ok] The label for the OK button
         */
        success: function (input) {
          return constructor('success', input);
        },

        /**
         * Create a new error alert.
         *
         * @alias com.devnup.alert.$alert#error
         *
         * @param {{}} input The input for the alert
         * @param {String} input.title The alert title
         * @param {String} input.message The alert message
         * @param {Function} [input.ok] The callback for the OK button click
         * @param {String} [input.button] The alert buttons configurations
         * @param {String} [input.button.ok] The label for the OK button
         * @returns {Object} The full configuration object cached for the modal
         */
        error: function (input) {
          return constructor('error', input);
        },

        /**
         * Create a new danger alert.
         *
         * @alias com.devnup.alert.$alert#danger
         *
         * @param {{}} input The input for the alert
         * @param {String} input.title The alert title
         * @param {String} input.message The alert message
         * @param {Function} [input.confirm] The callback for the Confirm button click
         * @param {Function} [input.cancel] The callback for the Cancel button click
         * @param {String} [input.button] The alert buttons configurations
         * @param {String} [input.button.confirm] The label for the Confirm button
         * @param {String} [input.button.cancel] The label for the Cancel button
         * @returns {Object} The full configuration object cached for the modal
         */
        danger: function (input) {
          return constructor('danger', input);
        },

        /**
         * Create a new warning alert.
         *
         * @alias com.devnup.alert.$alert#warning
         *
         * @param {{}} input The input for the alert
         * @param {String} input.title The alert title
         * @param {String} input.message The alert message
         * @param {Function} [input.confirm] The callback for the Confirm button click
         * @param {Function} [input.cancel] The callback for the Cancel button click
         * @param {String} [input.button] The alert buttons configurations
         * @param {String} [input.button.confirm] The label for the Confirm button
         * @param {String} [input.button.cancel] The label for the Cancel button
         * @returns {Object} The full configuration object cached for the modal
         */
        warning: function (input) {
          return constructor('warning', input);
        },

        /**
         * Create a new input alert.
         *
         * @alias com.devnup.alert.$alert#input
         *
         * @param {{}} input The input for the alert
         * @param {String} input.title The alert title
         * @param {String} input.message The alert message
         * @param {String} input.label The input label
         * @param {String} input.value The input value
         * @param {String} input.placeholder The input placeholder
         * @param {Function} [input.submit] The callback for the Submit button click
         * @param {Function} [input.cancel] The callback for the Cancel button click
         * @param {String} [input.button] The alert buttons configurations
         * @param {String} [input.button.submit] The label for the Submit button
         * @param {String} [input.button.cancel] The label for the Cancel button
         * @returns {Object} The full configuration object cached for the modal
         */
        input: function (input) {
          return constructor('input', input);
        },

        /**
         * Create a new loading alert.
         *
         * @alias com.devnup.alert.$alert#loading
         *
         * @param {{}} input The input for the alert
         * @param {String} input.image The image URL for the loader GIF. If none, default will be 'assets/img/loader.gif'
         * @param {String} input.alt The image ALT attribute. If none, default will be 'Loading'
         * @param {{}} input.style The input style for the alert
         * @param {Number} input.style.width The width for the img
         * @param {Number} input.style.height The height for the img
         * @returns {Object} The full configuration object cached for the modal
         */
        loading: function (input) {

          input = input || cache['loading'] || {};
          input.style = input.style || cache['loading'].style || {};

          return constructor('loading', {
            image: input.image || cache['loading'].image,
            style: {
              width: (input.style.width || 100),
              height: (input.style.height || 100),
              marginLeft: -(input.style.width / 2),
              marginTop: -(input.style.height / 2)
            }
          });
        },

        /**
         * Close the current loading alert
         */
        closeLoading: function () {
          angular
            .element("#alert-loading")
            .removeClass('open');
        },

        /**
         * Close the current alert modal
         */
        close: function () {
          angular
            .element(".alert-modal")
            .removeClass('open');
        },

        /**
         * Close all alerts
         */
        closeAll: function () {
          methods.closeLoading();
          methods.close();
        }
      };

      return methods;

    }])


  .controller('AlertModalCtrl', [
    '$scope', '$alert', '$rootScope',
    function ($scope, $alert, $rootScope) {

      $scope.loading = {};

      $scope.init = function (type) {

        $scope.type = type;

        if (type === 'loading') {

          $scope.loading = $alert.init($scope.type);
          return $scope.loading;
        }

        return $alert.init($scope.type);
      };

      $scope.$watch('init(type)', function (alert) {
        $scope.alert = alert;
      });

      $scope.ok = function () {

        var fn = $scope.alert.ok;

        if (fn && typeof fn === typeof angular.noop) {
          fn();
        }

        $scope.close();

      };

      $scope.confirm = function () {

        var fn = $scope.alert.confirm;

        if (fn && typeof fn === typeof angular.noop) {
          fn();
        }

        $scope.close();

      };

      $scope.submit = function () {

        var fn = $scope.alert.submit;

        if (fn && typeof fn === typeof angular.noop) {
          fn($scope.alert.value || $scope.alert.input);
        }

        $scope.close();

      };

      $scope.cancel = function () {

        var fn = $scope.alert.cancel;

        if (fn && typeof fn === typeof angular.noop) {
          fn();
        }

        $scope.close();

      };

      $scope.close = function () {
        $alert.close();
      };

      $scope.closeLoading = function () {
        $alert.closeLoading();
      };

    }
  ]);