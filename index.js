/*
 * grunt-ng-json2js
 * https://github.com/mbcooper/grunt-ng-json2js
 *
 * Copyright (c) 2014 mbcooper
 * Licensed under the MIT license.
 */
'use strict';
var gUtil      = require('gulp-util'),
	through    = require('through2'),
	extend     = require('node.extend'),
	header     = require('gulp-header'),
	footer     = require('gulp-footer'),
	extReplace = require('gulp-ext-replace');

var PLUGIN_NAME = 'grunt-ng-json2js';
var PluginError = gUtil.PluginError;
var PART1 = 'angular.module(\'',
	PART2 = '\', []).value(\'',
	PART3 = '\', \n';
var NAME_REPLACE = new RegExp('(?:-|\/)([a-zA-Z0-9])', 'g');
var JSON_EXT = /\.json$/;

function generateFooter() {
	return '\n);';
}

/**
 *
 * @param file
 * @return {string}
 */
function generateHeader(file, options) {
	var path = file.base + '/' + file.cwd + file.relative;
	var moduleName = (options.stripPrefix) ?
		path.replace(options.stripPrefix, '') :
		path;
	moduleName = (options.prependPrefix) ?
	options.prependPrefix + moduleName :
		moduleName;
	var valueName = path.replace(JSON_EXT, '');

	valueName = valueName.replace(NAME_REPLACE, function (all, letter) {
		return letter.toUpperCase();
	});

	return PART1 + moduleName + PART2 + valueName + PART3;
}

function makeValue(params) {

	/* jshint validthis */
	var options = {
		stripPrefix  : '',
		prependPrefix: ''
	};
	options = extend(true, options, params);

	// creating a stream through which each file will pass
	var stream = through.obj(function (file, enc, cb) {

		var prefix = generateHeader(file, options);
		var postFix = generateFooter();

		if (file.isStream()) {

			file.contents = file.contents
				.pipe(header(prefix))
				.pipe(footer(postFix))
				.pipe(extReplace('.js'));

		}
		if (file.isBuffer()) {
			var preBuffer = new Buffer(prefix);
			var postBuffer = new Buffer(postFix);
			file.contents = Buffer.concat(
				[preBuffer,
					file.contents,
					postBuffer]);
			var newPath = gUtil.replaceExtension(file.relative, '.js');

		}

		// make sure the file goes through the next gulp plugin
		this.push(file);
		// tell the stream engine that we are done with this file
		cb();
	});

	return stream;
	// 1. find files name and create header, prepend

	// 2. rest of stream

	// 3. add simple footer

	// replace extension

};

module.exports = makeValue;

