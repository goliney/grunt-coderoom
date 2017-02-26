# grunt-coderoom [![Build Status](https://travis-ci.org/goliney/grunt-coderoom.svg?branch=master)](https://travis-ci.org/goliney/grunt-coderoom)

> Grunt plugin for [Coderoom](https://github.com/goliney/coderoom)

## Getting Started
This plugin requires Grunt `~0.4.5` and node `>= 0.12`

You may install this plugin with this command:

```shell
npm install grunt-coderoom --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-coderoom');
```

## The "coderoom" task

### Overview
In your project's Gruntfile, add a section named `coderoom` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  coderoom: {
    build: {
      src: 'path/to/coderoom/source/',
      dest: 'path/to/coderoom/destination/'
    }
  },
});
```