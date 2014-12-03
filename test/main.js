/*global describe, it*/
"use strict";

var fs     = require("fs"),
	es     = require("event-stream"),
	should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

var gutil   = require("gulp-util"),
	json2js = require("../");

describe("gulp-ng-json2js", function () {

	var expectedFile = new gutil.File({
		path    : "expected/123.js",
		cwd     : "test/",
		base    : "expected",
		contents: fs.createReadStream("expected/123.js")
	});

	it("should produce expected file via stream", function (done) {

		var srcFile = new gutil.File({
			path    : "fixtures/123.json",
			cwd     : "test/",
			base    : "fixtures",
			contents: fs.createReadStream("fixtures/123.json")
		});

		var options = {
			stripPrefix  : '',
			prependPrefix: ''
		};
		var stream = json2js(options);

		stream.on("error", function (err) {
			should.exist(err);
			done(err);
		});

		stream.on("data", function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);

			//String(newFile.contents).should.equal(String(expectedFile.contents));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	//it("should error on stream", function (done) {
    //
	//	var srcFile = new gutil.File({
	//		path    : "test/fixtures/hello.txt",
	//		cwd     : "test/",
	//		base    : "test/fixtures",
	//		contents: fs.createReadStream("test/fixtures/hello.txt")
	//	});
    //
	//	var stream = json2js("World");
    //
	//	stream.on("error", function (err) {
	//		should.exist(err);
	//		done();
	//	});
    //
	//	stream.on("data", function (newFile) {
	//		newFile.contents.pipe(es.wait(function (err, data) {
	//			done(err);
	//		}));
	//	});
    //
	//	stream.write(srcFile);
	//	stream.end();
	//});

	/*
	 it("should produce expected file via stream", function (done) {

	 var srcFile = new gutil.File({
	 path: "test/fixtures/hello.txt",
	 cwd: "test/",
	 base: "test/fixtures",
	 contents: fs.createReadStream("test/fixtures/hello.txt")
	 });

	 var stream = json2js("World");

	 stream.on("error", function(err) {
	 should.exist(err);
	 done();
	 });

	 stream.on("data", function (newFile) {

	 should.exist(newFile);
	 should.exist(newFile.contents);

	 newFile.contents.pipe(es.wait(function(err, data) {
	 should.not.exist(err);
	 data.should.equal(String(expectedFile.contents));
	 done();
	 }));
	 });

	 stream.write(srcFile);
	 stream.end();
	 });
	 */
});
