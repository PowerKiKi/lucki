'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/scripts/*.js',
                'src/scripts/bootstrap/*.js',
                '!src/scripts/bootstrap.js'
            ]
        },
        recess: {
            dist: {
                options: {
                    compile: true,
                    compress: true
                },
                files: {
                    'style.css': [
                        'src/styles/style.less',
                        'src/styles/*.less',
                        'src/styles/*.css'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'images/bootstrap.js': [
                        'src/scripts/bootstrap/transition.js',
                        'src/scripts/bootstrap/alert.js',
                        'src/scripts/bootstrap/button.js',
                        'src/scripts/bootstrap/carousel.js',
                        'src/scripts/bootstrap/collapse.js',
                        'src/scripts/bootstrap/dropdown.js',
                        'src/scripts/bootstrap/modal.js',
                        'src/scripts/bootstrap/tooltip.js',
                        'src/scripts/bootstrap/popover.js',
                        'src/scripts/bootstrap/scrollspy.js',
                        'src/scripts/bootstrap/tab.js',
                        'src/scripts/bootstrap/affix.js',
                        'src/scripts/*.js'
                    ]
                }
            }
        },
        watch: {
            less: {
                files: [
                    'src/styles/less/*.less'
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
                    'style.css',
                    'images/bootstrap.js'
                ]
            }
        },
        clean: {
            dist: [
                'style.css',
                'images/bootstrap.js'
            ]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.registerTask('default', ['clean', 'recess', 'uglify']);
    grunt.registerTask('dev', ['watch']);
};
