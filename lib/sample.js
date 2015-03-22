/**
 * Created by luiseduardobrito on 3/4/15.
 */
var app = angular.module('sample', [
  'com.devnup.alert'
]).controller('SampleCtrl', ['$scope', '$alert', function ($scope, $alert) {

  $scope.info = function () {

    // Simple info alert
    $alert.info({
      title: 'Sample Alert',
      message: 'This is a sample modal alert created using $alert service',
      ok: function () {
        console.info('Clicked OK!');
      }
    });
  };

  $scope.error = function () {

    // Error alert
    $alert.error({
      title: 'Sample Error Alert',
      message: 'This is a sample modal alert created using $alert service',
      ok: function () {
        console.info('Clicked OK!');
      }
    });
  };

  $scope.input = function () {

    // Input alert
    $alert.input({

      title: 'Sample Input Alert',
      message: 'This is a sample modal alert to get user input',
      value: 'default(input[value])',
      placeholder: 'default(input[placeholder])',

      submit: function (input) {
        console.info('Response: ' + input);
      }
    });
  };

}]);