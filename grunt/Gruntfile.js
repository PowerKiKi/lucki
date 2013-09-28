'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'scripts/*.js',
        'scripts/bootstrap/*.js'
      ]
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          'styles/bootstrap.css': [
            'styles/style.less',
            'styles/*.less',
            'styles/*.css'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'scripts/bootstrap.js': [
            'scripts/bootstrap/transition.js',
            'scripts/bootstrap/alert.js',
            'scripts/bootstrap/button.js',
            'scripts/bootstrap/carousel.js',
            'scripts/bootstrap/collapse.js',
            'scripts/bootstrap/dropdown.js',
            'scripts/bootstrap/modal.js',
            'scripts/bootstrap/tooltip.js',
            'scripts/bootstrap/popover.js',
            'scripts/bootstrap/scrollspy.js',
            'scripts/bootstrap/tab.js',
            'scripts/bootstrap/affix.js',
            'scripts/*.js'
          ]
        }
      }
    },
    watch: {
      less: {
        files: [
          'styles/less/*.less'
        ],
        tasks: ['recess']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'styles/bootstrap.css',
          'scripts/bootstrap.js'
        ]
      }
    },
    clean: {
      dist: [
        'styles/bootstrap.css',
        'scripts/bootstrap.js'
      ]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.registerTask('default', ['clean','recess','uglify']);
  grunt.registerTask('dev', ['watch']);
};
