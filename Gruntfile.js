module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    copy: {
      main: {
        src: 'lib/src/js/angular-modal-alerts.js',
        dest: 'lib/dist/js/angular-modal-alerts.js'
      }
    },

    concat: {

      options: {
        separator: '\n'
      },


      alerts: {
        src: ['lib/src/views/**.html'],
        dest: 'lib/dist/html/angular-modal-alerts.html'
      },

      preloader: {
        src: ['lib/src/preloader/**.html'],
        dest: 'lib/dist/html/preloader.html'
      }

    },

    uglify: {
      minify: {
        files: {
          'lib/dist/js/angular-modal-alerts.min.js': ['lib/dist/js/angular-modal-alerts.js']
        }
      }
    },

    less: {
      lib: {
        options: {
          paths: ['lib/src/less']
        },
        files: {
          'lib/dist/css/angular-modal-alerts.css': 'lib/src/less/**.less'
        }
      },
      sample: {
        options: {
          paths: ['lib/assets/less']
        },
        files: {
          'lib/assets/css/sample.css': 'lib/assets/less/**.less'
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'lib/dist/css/angular-modal-alerts.min.css': ['lib/dist/css/angular-modal-alerts.css'],
          'lib/assets/css/sample.min.css': ['lib/assets/css/sample.css']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'lib/dist/html/angular-modal-alerts.min.html': 'lib/dist/html/angular-modal-alerts.html',
          'lib/dist/html/preloader.min.html': 'lib/dist/html/preloader.html'
        }
      }
    },

    clean: ["lib/dist/", "lib/assets/css/", "lib/docs"],

    watch: {
      files: [
        'lib/src/**',
        'lib/views/**',
        'lib/index.html',
        'lib/sample.js',
        'lib/assets/less/**'
      ],
      tasks: ['dev']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('dev', ['clean', 'copy', 'concat', 'uglify', 'less', 'cssmin', 'htmlmin']);
  grunt.registerTask('default', ['dev']);
};