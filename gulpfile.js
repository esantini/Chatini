/*
    Generated from typescript file
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp");
var gUtil = require("gulp-util");
var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var less = require("gulp-less");
var concat = require("gulp-concat");
var path = require("path");
var watchTask;
var wachAll = [];
//
//
watchTask = {
    taskName: "myTypeScripts",
    src: 'src/**/*.ts',
    dest: 'build/'
};
wachAll.push(watchTask);
(function (name, src, dest) {
    var tsProject = tsc.createProject('tsconfig.json');
    var tsProject2 = tsc.createProject('tsconfig.json');
    var clientScripts = 'src/modules/**/client/**/*.ts';
    // Transpiles typescript files from the source to the build.
    gulp.task(name, function () {
        gulp.src([src, '!' + clientScripts])
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write('.', { sourceRoot: '../src/', includeContent: false }))
            .pipe(gulp.dest(dest));
        gulp.src(clientScripts)
            .pipe(sourcemaps.init())
            .pipe(tsProject2())
            .pipe(concat('main.min.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dest + 'public/javascripts/'));
    });
})(watchTask.taskName, watchTask.src, watchTask.dest);
//
//
watchTask = {
    taskName: "myLess",
    src: 'src/**/*.less',
    dest: 'build/'
};
wachAll.push(watchTask);
(function (name, src, dest) {
    gulp.task(name, function () {
        gulp.src(src)
            .pipe(sourcemaps.init())
            .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }).on('error', gUtil.log))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dest));
    });
})(watchTask.taskName, watchTask.src, watchTask.dest);
//
//
watchTask = {
    taskName: "myViews",
    src: 'src/modules/**/client/views/**/*.html',
    dest: 'build/public/views/'
};
wachAll.push(watchTask);
// Flatten is being used to remove the source's relative path
var flatten = require("gulp-flatten");
(function (name, src, dest) {
    gulp.task(name, function () {
        gulp.src(src)
            .pipe(flatten())
            .pipe(gulp.dest(dest));
    });
})(watchTask.taskName, watchTask.src, watchTask.dest);
//
//
watchTask = {
    taskName: "move_plain_files",
    src: ['src/**/*', '!src/**/*.ts', '!src/**/*.less', '!src/**/client/views/**/*.html'],
    dest: 'build/'
};
wachAll.push(watchTask);
(function (name, src, dest) {
    gulp.task(name, function () {
        gulp.src(src)
            .pipe(gulp.dest(dest));
    });
})(watchTask.taskName, watchTask.src, watchTask.dest);
//
//
watchTask = {
    taskName: "gulpfile",
    src: './gulpfile.ts',
    dest: ''
};
wachAll.push(watchTask);
(function (name, src, dest) {
    gulp.task(name, function () {
        var tsProject = tsc.createProject('tsconfig.json');
        gulp.src(src)
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(dest));
    });
})(watchTask.taskName, watchTask.src, watchTask.dest);
//
//
watchTask = {
    taskName: "tests",
    src: 'tests/**/*.ts',
    dest: 'tests'
};
wachAll.push(watchTask);
(function (name, src, dest) {
    gulp.task(name, function () {
        var tsProject = tsc.createProject('tsconfig.json');
        gulp.src(src)
            .pipe(tsProject())
            .pipe(gulp.dest(dest));
    });
})(watchTask.taskName, watchTask.src, watchTask.dest);
// 
// 
gulp.task('wacha', function () {
    wachAll.forEach(function (wacha) {
        console.log('Watching', wacha.taskName);
        gulp.watch(wacha.src, [wacha.taskName]);
    });
});
// set allTasks as an array of names, example: ['typescripts', 'jades', 'htmls']
var allTasks = (function () {
    var arr = [];
    wachAll.forEach(function (task) {
        arr.push(task.taskName);
    });
    return arr;
})();
// allTasks.push('watch_all');
gulp.task('build', function () {
    if (process.env.DEV_ENV) {
        gulp.src('node_modules/angular/angular.js')
            .pipe(gulp.dest('build/public/javascripts/angular'));
        gulp.src('node_modules/angular-route/angular-route.js')
            .pipe(gulp.dest('build/public/javascripts/angular'));
        // gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        // 	.pipe(gulp.dest('build/public/javascripts'));
        gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
            .pipe(gulp.dest('build/public/stylesheets'));
        gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css.map')
            .pipe(gulp.dest('build/public/stylesheets'));
    }
    gulp.src('node_modules/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('build/public/fonts'));
    // gulp.src('node_modules/jquery/dist/jquery.min.js')
    // 	.pipe(gulp.dest('build/public/javascripts'));
});
allTasks.push('build', 'wacha');
gulp.task('default', allTasks);

//# sourceMappingURL=data:application/json;charset=utf8;base64,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O0FBQ0wsOEJBQThCO0FBRTlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ2xCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDO2FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDO2FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztRQUN0RCw4REFBOEQ7UUFDOUQsaURBQWlEO1FBRWpELElBQUksQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUM7YUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsdURBQXVELENBQUM7YUFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDO1NBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztJQUV4QyxxREFBcUQ7SUFDckQsaURBQWlEO0FBQ2xELENBQUMsQ0FBQyxDQUFDO0FBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFFLENBQUMiLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5cdEdlbmVyYXRlZCBmcm9tIHR5cGVzY3JpcHQgZmlsZVxyXG4qL1xyXG5cclxuaW1wb3J0ICogYXMgZ3VscCBmcm9tICdndWxwJztcclxuaW1wb3J0ICogYXMgZ1V0aWwgZnJvbSAnZ3VscC11dGlsJztcclxuaW1wb3J0ICogYXMgdHNjIGZyb20gJ2d1bHAtdHlwZXNjcmlwdCc7XHJcbmltcG9ydCAqIGFzIHNvdXJjZW1hcHMgZnJvbSAnZ3VscC1zb3VyY2VtYXBzJztcclxuaW1wb3J0ICogYXMgbGVzcyBmcm9tICdndWxwLWxlc3MnO1xyXG5pbXBvcnQgKiBhcyBjb25jYXQgZnJvbSAnZ3VscC1jb25jYXQnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuLy9cclxuaW50ZXJmYWNlIFRhc2tUb1dhdGNoIHtcclxuXHR0YXNrTmFtZTogc3RyaW5nLFxyXG5cdHNyYzogc3RyaW5nIHwgc3RyaW5nW10sXHJcblx0ZGVzdDogc3RyaW5nXHJcbn1cclxudmFyIHdhdGNoVGFzazogVGFza1RvV2F0Y2g7XHJcbnZhciB3YWNoQWxsOiBBcnJheTxUYXNrVG9XYXRjaD4gPSBbXTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwibXlUeXBlU2NyaXB0c1wiLFxyXG5cdHNyYzogJ3NyYy8qKi8qLnRzJyxcclxuXHRkZXN0OiAnYnVpbGQvJ1xyXG59O1xyXG53YWNoQWxsLnB1c2god2F0Y2hUYXNrKTtcclxuKGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGVzdDogc3RyaW5nKTogdm9pZCB7XHJcblxyXG5cdHZhciB0c1Byb2plY3QgPSB0c2MuY3JlYXRlUHJvamVjdCgndHNjb25maWcuanNvbicpO1xyXG5cclxuXHR2YXIgdHNQcm9qZWN0MiA9IHRzYy5jcmVhdGVQcm9qZWN0KCd0c2NvbmZpZy5qc29uJyk7XHJcblx0dmFyIGNsaWVudFNjcmlwdHMgPSAnc3JjL21vZHVsZXMvKiovY2xpZW50LyoqLyoudHMnO1xyXG5cclxuXHQvLyBUcmFuc3BpbGVzIHR5cGVzY3JpcHQgZmlsZXMgZnJvbSB0aGUgc291cmNlIHRvIHRoZSBidWlsZC5cclxuXHRndWxwLnRhc2sobmFtZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcclxuXHRcdGd1bHAuc3JjKCBbIHNyYyBhcyBzdHJpbmcsICchJytjbGllbnRTY3JpcHRzIF0gKVxyXG5cdFx0XHRcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy5pbml0KCkpXHJcblx0XHRcdFx0LnBpcGUodHNQcm9qZWN0KCkpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMud3JpdGUoJy4nLCB7IHNvdXJjZVJvb3Q6ICcuLi9zcmMvJywgaW5jbHVkZUNvbnRlbnQ6IGZhbHNlIH0pKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoIGRlc3QgKSk7XHJcblxyXG5cdFx0Z3VscC5zcmMoY2xpZW50U2NyaXB0cylcclxuXHRcdFx0XHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMuaW5pdCgpKVxyXG5cdFx0XHRcdC5waXBlKHRzUHJvamVjdDIoKSlcclxuXHRcdFx0XHQucGlwZShjb25jYXQoJ21haW4ubWluLmpzJykpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMud3JpdGUoJy4nKSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCBkZXN0ICsgJ3B1YmxpYy9qYXZhc2NyaXB0cy8nICkpO1xyXG5cdH0pO1xyXG5cdFxyXG59KSh3YXRjaFRhc2sudGFza05hbWUsIHdhdGNoVGFzay5zcmMsIHdhdGNoVGFzay5kZXN0KTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwibXlMZXNzXCIsXHJcblx0c3JjOiAnc3JjLyoqLyoubGVzcycsXHJcblx0ZGVzdDogJ2J1aWxkLydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuXHRndWxwLnRhc2soIG5hbWUgLCBmdW5jdGlvbigpIHtcclxuXHRcdGd1bHAuc3JjKHNyYylcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy5pbml0KCkpXHJcblx0XHRcdC5waXBlKGxlc3Moe1xyXG5cdFx0XHRcdHBhdGhzOiBbIHBhdGguam9pbihfX2Rpcm5hbWUsICdsZXNzJywgJ2luY2x1ZGVzJyldXHJcblx0XHRcdH0pLm9uKCdlcnJvcicsIGdVdGlsLmxvZykpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMud3JpdGUoJy4nKSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCBkZXN0ICkpO1xyXG5cdH0pO1xyXG5cclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcIm15Vmlld3NcIixcclxuXHRzcmM6ICdzcmMvbW9kdWxlcy8qKi9jbGllbnQvdmlld3MvKiovKi5odG1sJyxcclxuXHRkZXN0OiAnYnVpbGQvcHVibGljL3ZpZXdzLydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbi8vIEZsYXR0ZW4gaXMgYmVpbmcgdXNlZCB0byByZW1vdmUgdGhlIHNvdXJjZSdzIHJlbGF0aXZlIHBhdGhcclxuaW1wb3J0ICogYXMgZmxhdHRlbiBmcm9tICdndWxwLWZsYXR0ZW4nO1xyXG4oZnVuY3Rpb24obmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZyB8IHN0cmluZ1tdLCBkZXN0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcblx0Z3VscC50YXNrKCBuYW1lICwgZnVuY3Rpb24oKSB7XHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKGZsYXR0ZW4oKSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCBkZXN0ICkpO1xyXG5cclxuXHR9KTtcclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcIm1vdmVfcGxhaW5fZmlsZXNcIixcclxuXHRzcmM6IFsnc3JjLyoqLyonLCAnIXNyYy8qKi8qLnRzJywgJyFzcmMvKiovKi5sZXNzJywgJyFzcmMvKiovY2xpZW50L3ZpZXdzLyoqLyouaHRtbCddLFxyXG5cdGRlc3Q6ICdidWlsZC8nXHJcbn07XHJcbndhY2hBbGwucHVzaCh3YXRjaFRhc2spO1xyXG4oZnVuY3Rpb24obmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZyB8IHN0cmluZ1tdLCBkZXN0OiBzdHJpbmcpIHtcclxuXHRcclxuXHRndWxwLnRhc2sobmFtZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdChkZXN0KSk7XHJcblx0fSk7XHJcblxyXG59KSh3YXRjaFRhc2sudGFza05hbWUsIHdhdGNoVGFzay5zcmMsIHdhdGNoVGFzay5kZXN0KTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwiZ3VscGZpbGVcIixcclxuXHRzcmM6ICcuL2d1bHBmaWxlLnRzJyxcclxuXHRkZXN0OiAnJ1xyXG59O1xyXG53YWNoQWxsLnB1c2god2F0Y2hUYXNrKTtcclxuKGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGVzdDogc3RyaW5nKSB7XHJcblx0XHJcblx0Z3VscC50YXNrKG5hbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHRzUHJvamVjdCA9IHRzYy5jcmVhdGVQcm9qZWN0KCd0c2NvbmZpZy5qc29uJyk7XHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMuaW5pdCgpKVxyXG5cdFx0XHQucGlwZSh0c1Byb2plY3QoKSlcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy53cml0ZSgpKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoZGVzdCkpO1xyXG5cdH0pO1xyXG5cclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcInRlc3RzXCIsXHJcblx0c3JjOiAndGVzdHMvKiovKi50cycsXHJcblx0ZGVzdDogJ3Rlc3RzJ1xyXG59O1xyXG53YWNoQWxsLnB1c2god2F0Y2hUYXNrKTtcclxuKGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGVzdDogc3RyaW5nKSB7XHJcblx0XHJcblx0Z3VscC50YXNrKG5hbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHRzUHJvamVjdCA9IHRzYy5jcmVhdGVQcm9qZWN0KCd0c2NvbmZpZy5qc29uJyk7XHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKHRzUHJvamVjdCgpKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoZGVzdCkpO1xyXG5cdH0pO1xyXG5cclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcbi8vIFxyXG4vLyBcclxuZ3VscC50YXNrKCd3YWNoYScsIGZ1bmN0aW9uKCkge1xyXG5cdHdhY2hBbGwuZm9yRWFjaCh3YWNoYSA9PiB7XHJcblx0XHRjb25zb2xlLmxvZygnV2F0Y2hpbmcnLCB3YWNoYS50YXNrTmFtZSk7XHJcblx0XHRndWxwLndhdGNoKHdhY2hhLnNyYywgW3dhY2hhLnRhc2tOYW1lXSk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuLy8gc2V0IGFsbFRhc2tzIGFzIGFuIGFycmF5IG9mIG5hbWVzLCBleGFtcGxlOiBbJ3R5cGVzY3JpcHRzJywgJ2phZGVzJywgJ2h0bWxzJ11cclxudmFyIGFsbFRhc2tzID0gKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGFycjogc3RyaW5nW10gPSBbXTtcclxuXHR3YWNoQWxsLmZvckVhY2godGFzayA9PiB7XHJcblx0XHRhcnIucHVzaCh0YXNrLnRhc2tOYW1lKTtcclxuXHR9KTtcclxuXHRyZXR1cm4gYXJyO1xyXG59KSgpO1xyXG4vLyBhbGxUYXNrcy5wdXNoKCd3YXRjaF9hbGwnKTtcclxuXHJcbmd1bHAudGFzaygnYnVpbGQnLCBmdW5jdGlvbigpIHtcclxuXHRpZihwcm9jZXNzLmVudi5ERVZfRU5WKSB7XHJcblx0XHRndWxwLnNyYygnbm9kZV9tb2R1bGVzL2FuZ3VsYXIvYW5ndWxhci5qcycpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdCgnYnVpbGQvcHVibGljL2phdmFzY3JpcHRzL2FuZ3VsYXInKSk7XHJcblxyXG5cdFx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9hbmd1bGFyLXJvdXRlL2FuZ3VsYXItcm91dGUuanMnKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9qYXZhc2NyaXB0cy9hbmd1bGFyJykpO1xyXG5cdFx0Ly8gZ3VscC5zcmMoJ25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9qcy9ib290c3RyYXAubWluLmpzJylcclxuXHRcdC8vIFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMnKSk7XHJcblxyXG5cdFx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9zdHlsZXNoZWV0cycpKTtcclxuXHRcdGd1bHAuc3JjKCdub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzLm1hcCcpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdCgnYnVpbGQvcHVibGljL3N0eWxlc2hlZXRzJykpO1xyXG5cdH1cclxuXHJcblx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9mb250cy8qJylcclxuXHRcdC5waXBlKGd1bHAuZGVzdCgnYnVpbGQvcHVibGljL2ZvbnRzJykpO1xyXG5cclxuXHQvLyBndWxwLnNyYygnbm9kZV9tb2R1bGVzL2pxdWVyeS9kaXN0L2pxdWVyeS5taW4uanMnKVxyXG5cdC8vIFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMnKSk7XHJcbn0pO1xyXG5hbGxUYXNrcy5wdXNoKCdidWlsZCcsICd3YWNoYScpO1xyXG5cclxuZ3VscC50YXNrKCdkZWZhdWx0JywgYWxsVGFza3MgKTtcclxuIl19
