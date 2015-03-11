/**
 * Created by luiseduardobrito on 3/4/15.
 */
var app = angular.module('editorSample', [
    'com.devnup.color'
]);

app.controller('EditorCtrl', [
    '$scope', '$color',
    function ($scope, $color) {

        // Default Values
        value = 80;
        saturation = 70;
        number = 10;

        /**
         * HSV to RGB color conversion
         *
         * H runs from 0 to 360 degrees
         * S and V run from 0 to 100
         */
        function hsvToRgb(h, s, v) {
            var r, g, b;
            var i;
            var f, p, q, t;
            // Make sure our arguments stay in-range
            h = Math.max(0, Math.min(360, h));
            s = Math.max(0, Math.min(100, s));
            v = Math.max(0, Math.min(100, v));
            // We accept saturation and value arguments from 0 to 100 because that's
            // how Photoshop represents those values. Internally, however, the
            // saturation and value are calculated from a range of 0 to 1. We make
            // That conversion here.
            s /= 100;
            v /= 100;
            if (s == 0) {
                // Achromatic (grey)
                r = g = b = v;
                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
            }
            h /= 60; // sector 0 to 5
            i = Math.floor(h);
            f = h - i; // factorial part of h
            p = v * (1 - s);
            q = v * (1 - s * f);
            t = v * (1 - s * (1 - f));
            switch (i) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                default: // case 5:
                    r = v;
                    g = p;
                    b = q;
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        // RGB to HEX conversion
        function RGB2HTML(red, green, blue) {
            var decColor = red + 256 * green + 256 * 256 * blue;
            return decColor.toString(16);
        }

        // Shade a HEX color
        function shadeColor(color, percent) {
            var num = parseInt(color, 16),
                amt = Math.round(2.55 * percent),
                R = (num >> 16) + amt,
                G = (num >> 8 & 0x00FF) + amt,
                B = (num & 0x0000FF) + amt;
            return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
        }

        // Distinct Colors based on HSV
        function distinctColors(total) {
            var i = 360 / (total); // distribute the colors evenly on the hue range
            var r = []; // hold the generated colors
            for (var x = 0; x < total; x++) {
                r.push(hsvToRgb(i * x, saturation, value)); // changes on saturation and value changes the final result
            }
            return r;
        }

        // Generate Distinct Colors Based on Devnup Branding
        function devnupColors(n) {
            var colorsDec = [];
            var colorsHex = [];
            colorsDec = distinctColors(n);
            for (k in colorsDec) {
                colorsHex[k] = "#" + RGB2HTML(colorsDec[k][0], colorsDec[k][1], colorsDec[k][2]);
            }
            return colorsHex;
        }

        // Generate Distinct Hover Colors Based on Devnup Branding
        function devnupColorsHover(n) {
            var colorsDec = [];
            var colorsHex = [];
            colorsDec = distinctColors(n);
            for (k in colorsDec) {
                colorsHex[k] = "#" + shadeColor(RGB2HTML(colorsDec[k][0], colorsDec[k][1], colorsDec[k][2]), 10);
            }
            return colorsHex;
        }

        // Generate Colors on HTML based on form
        $scope.generateColors = function () {

            number = Number($('#number').val());
            saturation = Number($('#saturation').val());
            value = Number($('#value').val());


            // Generates Normal Colors
            colors = devnupColors(number);
            html = '';
            j = 0;
            while (j < number) {
                html += '<div style = "height:30px;">';
                i = 0;
                for (n in colors) {
                    k = i - j;
                    if (k < 0) {
                        k = (number) + (i - j);
                    }
                    html += '<div style="width: 30px; height: 30px; display: inline-block; background-color:' + colors[k] + '"></div>';
                    i++;
                }
                html += '</div>';
                j++;
            }
            $('#colorsBox').html(html);

            // Generates Hover Colors
            colorsHover = devnupColorsHover(number);
            html = '';
            j = 0;
            while (j < number) {
                html += '<div style = "height:30px;">';
                i = 0;
                for (n in colors) {
                    k = i - j;
                    if (k < 0) {
                        k = (number) + (i - j);
                    }
                    html += '<div style="width: 30px; height: 30px; display: inline-block; background-color:' + colorsHover[k] + '"></div>';
                    i++;
                }
                html += '</div>';
                j++;
            }
            $('#hoverColorsBox').html(html);
            return false;
        };

        $scope.generateColors();

    }]);