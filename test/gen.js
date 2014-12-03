/**
 * Created by mike on 12/3/2014.
 */
var gulp = require('gulp');
delete require.cache[require.resolve("../")];
var json2Js = require("../");

gulp.src('./test/fixtures/123.json')
	.pipe(json2Js({}))
	.pipe(gulp.dest('./test/expected'));
