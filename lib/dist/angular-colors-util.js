/**
 * Angular Colors Util
 * v0.0.1
 *
 * @alias com.devnup.color
 *
 * @author luis@devnup.com
 * @since 03/02/15.
 */
angular.module('com.devnup.color', [])

    .factory('$color', [

        /**
         * Angular Colors Service
         * v0.0.1
         *
         * @class
         * @alias com.devnup.color.$color
         */
            function () {

            // Default Values
            var cache = {
                value: 80,
                saturation: 70,
                number: 10
            };

            /**
             * HSV to RGB color conversion
             *
             * H runs from 0 to 360 degrees
             * S and V run from 0 to 100
             *
             * @alias com.devnup.color.$color~hsvToRgb
             *
             * @param h
             * @param s
             * @param v
             */
            var hsvToRgb = function (h, s, v) {

                var r, g, b, i, f, p, q, t;

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

            };

            /**
             * RGB to HEX conversion
             *
             * @alias com.devnup.color.$color~rgbToHex
             *
             * @param red
             * @param green
             * @param blue
             * @returns {string}
             */
            var rgbToHex = function (red, green, blue) {
                var decColor = red + 256 * green + 256 * 256 * blue;
                return decColor.toString(16);
            };

            /**
             * Shade a hex color
             *
             * @alias com.devnup.color.$color~shadeColor
             *
             * @param color
             * @param percent
             * @returns {string}
             */
            var shadeColor = function (color, percent) {
                var num = parseInt(color, 16),
                    amt = Math.round(2.55 * percent),
                    R = (num >> 16) + amt,
                    G = (num >> 8 & 0x00FF) + amt,
                    B = (num & 0x0000FF) + amt;
                return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
            };

            /**
             * Generate distinct colors based on HSV
             *
             * @alias com.devnup.color.$color~distinctColors
             *
             * @param total
             * @returns {Array}
             */
            var distinctColors = function (total) {
                var i = 360 / (total); // distribute the colors evenly on the hue range
                var r = []; // hold the generated colors
                for (var x = 0; x < total; x++) {
                    r.push(hsvToRgb(i * x, cache.saturation, cache.value)); // changes on saturation and value changes the final result
                }
                return r;
            };

            /**
             * Generate distinct colors based on Devnup branding
             *
             * @alias com.devnup.color.$color~devnupColors
             *
             * @param n
             * @returns {Array}
             */
            var devnupColors = function (n) {
                var colorsHex = [];
                colorsDec = distinctColors(n);
                for (k in colorsDec) {
                    colorsHex[k] = "#" + rgbToHex(colorsDec[k][0], colorsDec[k][1], colorsDec[k][2]);
                }
                return colorsHex;
            };

            return {

                /**
                 * Set generator configuration values.
                 *
                 * @alias com.devnup.color.$color#config
                 *
                 * @param {Object} cfg The input configuration
                 * @param {Number} [cfg.value] The color value
                 * @param {Number} [cfg.saturation] The color saturation
                 * @param {Number} [cfg.number] The color number
                 */
                config: function (cfg) {
                    cache.value = cfg.value || cache.value;
                    cache.saturation = cfg.saturation || cache.saturation;
                    cache.number = cfg.number || cache.number;
                },

                /**
                 * Generate a new random color set.
                 *
                 * @alias com.devnup.color.$color#generate
                 *
                 * @param {Number} number The color count
                 * @param {Boolean} [branding] If true generate using branding colors as reference
                 */
                generate: function (number, branding) {

                    // Generate colors based on branding
                    if (number && number > 0 && branding) {
                        return devnupColors(number);
                    }

                    // Generate distinct colors
                    else {
                        return distinctColors(number);
                    }

                },

                /**
                 * Hover a hex color.
                 *
                 * @alias com.devnup.color.$color#hover
                 *
                 * @param {Number} color The color to hover.
                 * @param {Number} [percent] The value to hover, default: 20%
                 */
                hover: function (color, percent) {
                    percent = percent || 20;
                    return shadeColor(color, percent);
                }

            }

        }]);