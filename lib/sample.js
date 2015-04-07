/**
 * Created by luiseduardobrito on 3/4/15.
 */
var app = angular.module('sample', [
  'com.devnup.alert'
])
  .run(function ($alert) {
    $alert.config({

      // image: http://example.com/path/to/loader.gif
      loading: {
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

    $scope.error = function () {

      // Error alert
      $alert.error({
        title: 'Error Alert',
        message: 'This is a sample modal alert created using $alert service',
        ok: function () {
          console.info('Clicked OK!');
        }
      });
    };

    $scope.input = function () {

      // Input alert
      $alert.input({

        title: 'Input Alert',
        message: 'This is a sample modal alert to get user input',
        value: 'default(input[value])',
        placeholder: 'default(input[placeholder])',

        submit: function (input) {
          console.info('Response: ' + input);
        }
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

    $scope.loading = function () {

      // Simple loading alert
      $alert.loading();


      $timeout(function () {
        $alert.closeLoading();
      }, 3000);

    };

    // Preloader
    jQuery(window).load(function () {
      jQuery(".preloader").fadeOut();
      jQuery("body").removeClass("remove-scroll");
    });


  }]);