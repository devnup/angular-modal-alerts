/**
 * Created by luiseduardobrito on 3/4/15.
 */
var app = angular.module('sample', [
  'com.devnup.alert'
])
  .run(function ($alert) {

    $alert.config({

      loading: {
        image: 'assets/img/loader1.gif',
        alt: 'Loading',
        style: {
          width: 50,
          height: 50
        }
      }
    });
  })

  .controller('SampleCtrl', ['$scope', '$alert', '$timeout', function ($scope, $alert, $timeout) {

    $scope.info = function () {

      // Simple info alert
      $alert.info({
        title: 'Info Alert',
        message: 'This is a sample modal alert created using $alert service',
        ok: function () {
          console.info('Clicked OK!');
        }
      });
    };

    $scope.input = function () {

      // Simple input alert
      $alert.input({

        title: 'Input Alert',
        message: 'This is a sample modal alert to get user input',
        value: 'default(input[value])',
        label: 'Email',
        placeholder: 'default(input[placeholder])',

        submit: function (input) {
          console.info('Response: ' + input);
        }
      });
    };

    $scope.custom = function () {

      // Simple info alert
      $alert.modal({
        title: 'Custom Modal',
        icon: 'fa fa-info',
        templateUrl: '/src/custom.html'
      });
    };

    $scope.success = function () {

      // Simple success alert
      $alert.success({
        title: 'Success Alert',
        message: 'This is a success modal alert created using $alert service',
        ok: function () {
          console.info('Clicked OK!');
        }
      });
    };

    $scope.warning = function () {

      // Simple warning alert
      $alert.warning({
        title: 'Warning Alert',
        message: 'This is a warning modal alert created using $alert service',
        ok: function () {
          console.info('Clicked OK!');
        }
      });
    };

    $scope.error = function () {

      // Simple error alert
      $alert.error({
        title: 'Error Alert',
        message: 'This is a sample modal alert created using $alert service',
        ok: function () {
          console.info('Clicked OK!');
        }
      });
    };

    $scope.loading = function (i) {

      i = i || 1;

      // Simple loading alert
      $alert.loading({
        image: 'assets/img/loader' + i + '.gif'
      });

      $timeout(function () {
        $alert.closeLoading();
      }, 3000);

    };

  }]);