'use strict';

var request = require('request');

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    require('babelify');

    var remapify = require('remapify');

    var reloadPort = 35729, files;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        develop: {
            server: {
                file: 'bin/www'
            }
        },
        sass: {
            dist: {
                files: {
                    'public/css/style.css': 'public/sass/style.scss'
                }
            }
        },
        browserify:     {
            options:      {
                debug: true,
                transform:  [
                    'babelify',
                    'reactify'
                ]
            },
            js: {
                files: {
                    'public/js/build/app.js': ['public/js/app.jsx']
                }
            }
        },
        watch: {
            options: {
                nospawn: true,
                livereload: reloadPort
            },
            server: {
                files: [
                    'bin/www',
                    'app.js',
                    'routes/*.js',
                    'views/*.html'
                ],
                tasks: ['develop', 'delayed-livereload']
            },
            js: {
                files: ['public/js/build/app.js', 'public/js/*.jsx', 'public/js/components/*.jsx'],
                tasks: ['browserify'],
                options: {
                    livereload: reloadPort
                }
            },
            css: {
                files: [
                    'public/sass/**/*.scss'
                ],
                tasks: ['sass'],
                options: {
                    livereload: reloadPort
                }
            },
            views: {
                files: ['views/*.html'],
                options: {
                    livereload: reloadPort
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.config.requires('watch.server.files');
    files = grunt.config('watch.server.files');
    files = grunt.file.expand(files);

    grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
        var done = this.async();
        setTimeout(function () {
            request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function (err, res) {
                var reloaded = !err && res.statusCode === 200;
                if (reloaded) {
                    grunt.log.ok('Delayed live reload successful.');
                } else {
                    grunt.log.error('Unable to make a delayed live reload.');
                }
                done(reloaded);
            });
        }, 500);
    });

    grunt.registerTask('serve', [
        'sass',
        'browserify',
        'develop',
        'watch'
    ]);
};
