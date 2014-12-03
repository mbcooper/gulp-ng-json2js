# gulp-ng-json2js

>gulp task for converting JSON files to [AngularJS](http://angularjs.org/) values.


## This is a fork of [karma-ng-json2js-preprocessor] (https://github.com/EE/karma-ng-json2js-preprocessor)
## and a gulp version of my grunt implementation [grunt-ng-json2js] (https://github.com/mbcooper/grunt-ng-json2js.git)
I figured that we had no need to convert data on every karma test run, rather we make it into a
gulp task that we run when required.


## Getting Started
This plugin requires gulp `~3.8.10`

```shell
npm install gulp-ng-json2js --save-dev
```

### Converting the files

```js
var gulp     = require('gulp'),
    json2js = require('gulp-ng-json2js');

gulp.task('default', function () {
    gulp.src('fixtures/**/*.json')
        .pipe(json2js({
           stripPrefix: 'test/fixture/',
            prependPrefix: 'served/'
        }))
        .pipe(gulp.dest('*.js'));
});
```


## Use Examples
For instance this `test/fixture/data.json`  ...
```json
{
    prop: val
}
```
... with the configuration given above will be converted into:
```js
angular.module('served/data.json', []).value('servedData', {
    prop: 'val'
});
```
Inject json fixture into your test case:

```js
describe('me', function(){
    beforeEach(module('served/data.json'));

    it('should not fail', function() {
        var testFixture;
        inject(function (_servedData_) {
            testFixture = _servedData_;
        });

        expect(testFixture).toEqual({
            prop: 'val'
        });
    });

});
```

----

## Contributing

## Release History
_(Nothing yet)_
