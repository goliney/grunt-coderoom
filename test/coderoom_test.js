'use strict';

var grunt = require('grunt');
var cp = require('child_process');

function callGruntTask(taskname, whenDoneCallback) {
    var command = `grunt ${taskname}`;
    var options = {cwd: './'};
    cp.exec(command, options, whenDoneCallback);
}

function containsWarning(stdout, warning) {
    return stdout.indexOf(`Warning: ${warning}`) !== -1;
}

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.coderoom = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    build: function (test) {
        // coderoom:build is invoked before nodeunit task
        test.expect(3);

        var indexExists = grunt.file.exists('test/expected/build/index.html');
        var cssExists = grunt.file.isDir('test/expected/build/static');
        var tplsExists = grunt.file.isDir('test/expected/build/tpls');

        test.ok(indexExists, 'should create index html');
        test.ok(cssExists, 'should create static directory');
        test.ok(tplsExists, 'should create templates directory');

        test.done();
    },
    buildCompact: function (test) {
        test.expect(3);

        callGruntTask('coderoom:buildCompact', function () {
            var indexExists = grunt.file.exists('test/expected/buildCompact/index.html');
            var cssExists = grunt.file.isDir('test/expected/buildCompact/static');
            var tplsExists = grunt.file.isDir('test/expected/buildCompact/tpls');

            test.ok(indexExists, 'should create index html');
            test.ok(cssExists, 'should create static directory');
            test.ok(tplsExists, 'should create templates directory');

            test.done();
        });
    },
    invalidMultiplePairs: function (test) {
        test.expect(3);

        callGruntTask('coderoom:invalidMultiplePairs', function (error, stdout, stderr) {
            test.ok(error, 'should fail');
            test.equal(stderr, '', 'stderr should be empty');

            var stdoutOk = containsWarning(stdout, 'single source-destination pair should be provided. Got 2');
            test.ok(stdoutOk, 'should output correct error message');

            test.done();
        });
    },
    invalidMissingSource: function (test) {
        test.expect(3);

        callGruntTask('coderoom:invalidMissingSource', function (error, stdout, stderr) {
            test.ok(error, 'should fail');
            test.equal(stderr, '', 'stderr should be empty');

            var stdoutOk = containsWarning(stdout, 'source test/fixtures/source-does-not-exist/ doesn\'t exist.');
            test.ok(stdoutOk, 'should output correct error message');

            test.done();
        });
    }
};
