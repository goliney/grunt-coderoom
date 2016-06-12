/*
 * grunt-coderoom
 * https://github.com/goliney/grunt-coderoom
 *
 * Copyright (c) 2016 Sergey Goliney
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp', 'test/expected']
        },

        // Configuration to be run (and then tested).
        coderoom: {
            // valid configs
            build: {
                src: 'test/fixtures/source/',
                dest: 'test/expected/build/'
            },
            buildCompact: {
                files: {
                    'test/expected/buildCompact/': 'test/fixtures/source/'
                }
            },
            // invalid configs (used for testing):
            invalidMultiplePairs: {
                files: {
                    'test/expected/build/': 'test/fixtures/source/',
                    'test/expected/buildCompact/': 'test/fixtures/source/'
                }
            },
            invalidMissingSource: {
                src: 'test/fixtures/source-does-not-exist/',
                dest: 'test/expected/build/',
                nonull: true
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'coderoom:build', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
