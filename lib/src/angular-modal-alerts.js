/**
 * Angular Modal Alerts
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
         * Angular Alerts Service
         * v0.0.1
         *
         * @class
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
                    default:
                }

                return cache[type];
            };

            return {

                init: function (type) {
                    return cache[type];
                },

                success: function (input) {
                    alert('success', input);
                },

                error: function (input) {
                    alert('error', input);
                },

                danger: function (input) {
                    alert('danger', input);
                },

                warning: function (input) {
                    alert('warning', input);
                },

                info: function (input) {
                    alert('info', input);
                },

                input: function (input) {
                    alert('input', input);
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
                    fn($scope.alert.input);
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

        }
    ]);