/*
 * grunt-coderoom
 * https://github.com/goliney/grunt-coderoom
 *
 * Copyright (c) 2016 Sergey Goliney
 * Licensed under the MIT license.
 */

'use strict';

const coderoom = require('coderoom');

module.exports = function (grunt) {
    grunt.registerMultiTask('coderoom', 'Grunt plugin for Coderoom', function () {

        if (this.files.length !== 1) {
            grunt.fail.warn(`single source-destination pair should be provided. Got ${this.files.length}.`);
        }

        var srcDest = this.files[0];
        var src = srcDest.src[0];     // src always array
        var dest = srcDest.dest;

        if (srcDest.src.length !== 1) {
            grunt.fail.warn(`single source path should be provided. Got ${srcDest.src.length}.`);
        }

        if (!grunt.file.exists(src)) {
            grunt.fail.warn(`source ${src} doesn't exist.`);
        }

        if (!grunt.file.isDir(src)) {
            grunt.fail.warn(`source ${src} is not a directory.`);
        }

        var kindOfDest = grunt.util.kindOf(srcDest.dest);
        if (kindOfDest !== 'string') {
            grunt.fail.warn(`destination directory must be a string. Got ${srcDest.dest} type of ${kindOfDest} instead.`);
        }

        var start = process.hrtime();
        coderoom.build(src, dest);
        var elapsed = (process.hrtime(start)[1] / 1000000000).toFixed(3); // divide by a million to get nano to seconds

        grunt.log.ok(`Coderoom built into ${dest} (${elapsed}s)`);
    });
};
