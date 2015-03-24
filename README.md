angular-modal-alerts
===================

[![build status](http://ci.devnup.com/projects/18/status.png?ref=master)](http://ci.devnup.com/projects/18?ref=master)

### Installation

Using Bower: ```bower install --save angular-modal-alerts```

### Browser Usage

1 - Include the JS library in your HTML file:
2 - Include the CSS and HTML dependencies in your HTML file:
```markup
<head>
  <!-- Angular Colors Util (Minified) -->
  <link rel="stylesheet" href="bower_components/angular-modal-alerts/lib/dist/css/angular-modal-alerts.min.css"/>
  <script type="text/javascript" src="bower_components/angular-modal-alerts/lib/dist/js/angular-modal-alerts.min.js"></script>
</head>
<body>
  <!-- Angular Colors Util HTML (Minified) -->
  <ng-include src="'bower_components/angular-modal-alerts/lib/dist/html/angular-modal-alerts.min.html'"></ng-include>
</body>
```

Include the module in your Angular app:
```javascript
angular
    .module('myApp', ['com.devnup.alert'])
    .controller('SampleCtrl', ['$scope', '$alert', function ($scope, $alert) {

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

```

### Samples

- [Sample Alerts (HTML + JS)](http://angular-modal-alerts.snippets.devnup.com)

### Documentation

- [API Reference (JSDoc)](http://angular-modal-alerts.snippets.devnup.com/docs)

### Authors
- [André Seiji](https://github.com/seijitamanaha) - [seiji@devnup.com](mailto:seiji@devnup.com)
- [Luís Eduardo Brito](https://github.com/luiseduardobrito) - [luis@devnup.com](mailto:luis@devnup.com)

### License

The MIT License (MIT)

Copyright (c) 2015 - Devnup Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.