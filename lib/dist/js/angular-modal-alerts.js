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

  .factory('$alert', [

    /**
     * Angular Alerts Service.
     * v0.0.1
     *
     * @class
     * @type {Function}
     * @alias com.devnup.alert.$alert
     */
      function () {

      var cache = {};

      var constructor = function (type, input) {

        cache[type] = input;

        switch (type) {
          case 'success':
            jQuery('#alert-success').addClass('open');
            break;
          case 'warning':
            jQuery('#alert-warning').addClass('open');
            break;
          case 'danger':
            jQuery('#alert-danger').addClass('open');
            break;
          case 'error':
            jQuery('#alert-error').addClass('open');
            break;
          case 'info':
            jQuery('#alert-info').addClass('open');
            break;
          case 'input':
            jQuery('#alert-input').addClass('open');
            break;
          case 'loading':
            jQuery('#alert-loading').addClass('open');
            jQuery('#alert-loading-img').attr('src', input.image || 'assets/img/loader.gif');
            break;
          default:
        }

        return cache[type];
      };

      return {

        /**
         * Initializer constructor, should not be called directly outside angular-modal-alerts module.
         *
         * @alias com.devnup.alert.$alert#init
         *
         * @param type The alert type
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
         * @param input
         * @returns {{}} The instance created and cached
         */
        config: function (input) {

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
         */
        info: function (input) {
          constructor('info', input);
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
          constructor('success', input);
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
         */
        error: function (input) {
          constructor('error', input);
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
         */
        danger: function (input) {
          constructor('danger', input);
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
         */
        warning: function (input) {
          constructor('warning', input);
        },

        /**
         * Create a new input alert.
         *
         * @alias com.devnup.alert.$alert#input
         *
         * @param {{}} input The input for the alert
         * @param {String} input.title The alert title
         * @param {String} input.message The alert message
         * @param {String} input.value The input value
         * @param {String} input.placeholder The input placeholder
         * @param {Function} [input.submit] The callback for the Submit button click
         * @param {Function} [input.cancel] The callback for the Cancel button click
         * @param {String} [input.button] The alert buttons configurations
         * @param {String} [input.button.submit] The label for the Submit button
         * @param {String} [input.button.cancel] The label for the Cancel button
         */
        input: function (input) {
          constructor('input', input);
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
         */
        loading: function (input) {

          input = input || cache['loading'] || {};
          input.style = input.style || cache['loading'].style || {};

          constructor('loading', {
            image: input.image || cache['loading'].image,
            style: {
              width: (input.style.width || 100),
              height: (input.style.height || 100),
              marginLeft: -(input.style.width / 2),
              marginTop: -(input.style.height / 2)
            }
          });
        },

        closeLoading: function () {
          jQuery("#alert-loading").removeClass('open');
        },

        close: function () {
          jQuery(".alert-modal").removeClass('open');
        }
      }

    }])

  .controller('AlertModalCtrl', [
    '$scope', '$alert',
    function ($scope, $alert) {

      $scope.init = function (type) {

        if (type) {
          $scope.type = type;
        }

        return $alert.init($scope.type);
      };

      $scope.$watch('init()', function (alert) {
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
        jQuery(".alert-modal").removeClass('open');
      };

      $scope.closeLoading = function () {
        jQuery("#alert-loading").removeClass('open');
      };

    }
  ]);