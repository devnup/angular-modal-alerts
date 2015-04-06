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

      var alert = function (type, input) {

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
          alert('info', input);
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
          alert('success', input);
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
          alert('error', input);
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
          alert('danger', input);
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
          alert('warning', input);
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
          alert('input', input);
        },

        /**
         * Create a new loading alert.
         *
         * @alias com.devnup.alert.$alert#loading
         */
        loading: function () {
          alert('loading');
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