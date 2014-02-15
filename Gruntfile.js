'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/scripts/script.js'
            ]
        },
        less: {
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
                    'images/app.js': [
                        'src/scripts/jquery-1.10.1.min.js',
                        'src/scripts/modernizr-2.6.2.min.js',
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
                        'src/scripts/script.js'
                    ]
                }
            }
        },
        watch: {
            less: {
                files: [
                    'src/styles/*.less',
                    'src/styles/bootstrap/*.less'
                ],
                tasks: ['less']
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
                    'images/app.js'
                ]
            }
        },
        clean: {
            dist: [
                'style.css',
                'images/app.js'
            ]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['clean', 'less', 'uglify']);
    grunt.registerTask('dev', ['watch']);
};
