module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                src: 'lib/src/angular-colors-util.js',
                dest: 'lib/dist/angular-colors-util.js'
            }
        },

        uglify: {
            minify: {
                files: {
                    'lib/dist/angular-colors-util.min.js': ['lib/dist/angular-colors-util.js']
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ['lib/assets/less']
                },
                files: {
                    'lib/assets/css/style.css': 'lib/assets/less/**.less'
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'lib/assets/css/style.min.css': ['lib/dist/css/style.css']
                }
            }
        },

        clean: ["lib/dist/", "lib/assets/css/"],

        watch: {
            files: ['lib/**'],
            tasks: ['dev']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('dev', ['clean', 'copy', 'uglify', 'less', 'cssmin']);
    grunt.registerTask('default', ['dev']);
};