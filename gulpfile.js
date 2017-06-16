"use strict";
/*
    Generated from typescript file
*/
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
    taskName: "serverTypeScripts",
    src: ['src/**/*.ts', '!src/modules/**/client/**/*'],
    dest: 'build/'
};
wachAll.push(watchTask);
(function (name, src, dest) {
    var tsProject = tsc.createProject('tsconfig.json');
    // Transpiles typescript files from the source to the build.
    gulp.task(name, function () {
        gulp.src(src)
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write('.', { sourceRoot: '../src/', includeContent: false }))
            .pipe(gulp.dest(dest));
    });
})(watchTask.taskName, watchTask.src, watchTask.dest);
//
//
watchTask = {
    taskName: "clientTypeScripts",
    src: 'src/modules/**/client/**/*.ts',
    dest: 'build/'
};
wachAll.push(watchTask);
(function (name, src, dest) {
    var tsProject2 = tsc.createProject('tsconfig.json');
    // Transpiles & concatenates client's typescript files into a single file in /public
    gulp.task(name, function () {
        // make sure main.ts goes first to register angular modules and other stuff that needs executing first.
        gulp.src(['./src/modules/core/client/main.ts', src])
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
        gulp.src(['node_modules/angular/angular.js',
            'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
            'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js.map',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-animate/angular-animate.min.js.map',
            'node_modules/angular-aria/angular-aria.min.js',
            'node_modules/angular-aria/angular-aria.min.js.map',
            'node_modules/angular-messages/angular-messages.min.js',
            'node_modules/angular-messages/angular-messages.min.js.map',
            'node_modules/angular-cookies/angular-cookies.min.js',
            'node_modules/angular-cookies/angular-cookies.min.js.map',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js.map',
            'node_modules/angular-material/angular-material.js'])
            .pipe(gulp.dest('build/public/javascripts/angular'));
        gulp.src(['node_modules/angular-material/angular-material.min.css'])
            .pipe(gulp.dest('build/public/stylesheets'));
        gulp.src('node_modules/socket.io-client/dist/socket.io.js')
            .pipe(gulp.dest('build/public/javascripts'));
        gulp.src('node_modules/socket.io-client/dist/socket.io.js.map')
            .pipe(gulp.dest('build/public/javascripts'));
        gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
            .pipe(gulp.dest('build/public/stylesheets'));
        gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css.map')
            .pipe(gulp.dest('build/public/stylesheets'));
    }
    gulp.src(['node_modules/angular-translate/dist/angular-translate.min.js',
        'node_modules/angular-translate/dist/angular-translate-loader-static-files/' +
            'angular-translate-loader-static-files.min.js'])
        .pipe(gulp.dest('build/public/javascripts/angular'));
    gulp.src('node_modules/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('build/public/fonts'));
    // gulp.src('node_modules/jquery/dist/jquery.min.js')
    // 	.pipe(gulp.dest('build/public/javascripts'));
});
allTasks.push('build', 'wacha');
// @types are inconsistent:
gulp.task('default', allTasks); // should be: gulp.parallel( allTasks );

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQzthQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQzthQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQzthQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyw4REFBOEQ7UUFDdEUsNEVBQTRFO1lBQzNFLDhDQUE4QyxDQUFDLENBQUM7U0FDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO0lBRXRELElBQUksQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUM7U0FDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0lBRXhDLHFEQUFxRDtJQUNyRCxpREFBaUQ7QUFDbEQsQ0FBQyxDQUFDLENBQUM7QUFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUVoQywyQkFBMkI7QUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBZSxDQUFFLENBQUMsQ0FBQyx3Q0FBd0MiLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5cdEdlbmVyYXRlZCBmcm9tIHR5cGVzY3JpcHQgZmlsZVxyXG4qL1xyXG5cclxuaW1wb3J0ICogYXMgZ3VscCBmcm9tICdndWxwJztcclxuaW1wb3J0ICogYXMgZ1V0aWwgZnJvbSAnZ3VscC11dGlsJztcclxuaW1wb3J0ICogYXMgdHNjIGZyb20gJ2d1bHAtdHlwZXNjcmlwdCc7XHJcbmltcG9ydCAqIGFzIHNvdXJjZW1hcHMgZnJvbSAnZ3VscC1zb3VyY2VtYXBzJztcclxuaW1wb3J0ICogYXMgbGVzcyBmcm9tICdndWxwLWxlc3MnO1xyXG5pbXBvcnQgKiBhcyBjb25jYXQgZnJvbSAnZ3VscC1jb25jYXQnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuLy9cclxuaW50ZXJmYWNlIFRhc2tUb1dhdGNoIHtcclxuXHR0YXNrTmFtZTogc3RyaW5nLFxyXG5cdHNyYzogc3RyaW5nIHwgc3RyaW5nW10sXHJcblx0ZGVzdDogc3RyaW5nXHJcbn1cclxudmFyIHdhdGNoVGFzazogVGFza1RvV2F0Y2g7XHJcbnZhciB3YWNoQWxsOiBBcnJheTxUYXNrVG9XYXRjaD4gPSBbXTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwic2VydmVyVHlwZVNjcmlwdHNcIixcclxuXHRzcmM6IFsnc3JjLyoqLyoudHMnLCAnIXNyYy9tb2R1bGVzLyoqL2NsaWVudC8qKi8qJ10sXHJcblx0ZGVzdDogJ2J1aWxkLydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuXHR2YXIgdHNQcm9qZWN0ID0gdHNjLmNyZWF0ZVByb2plY3QoJ3RzY29uZmlnLmpzb24nKTtcclxuXHJcblx0Ly8gVHJhbnNwaWxlcyB0eXBlc2NyaXB0IGZpbGVzIGZyb20gdGhlIHNvdXJjZSB0byB0aGUgYnVpbGQuXHJcblx0Z3VscC50YXNrKG5hbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHJcblx0XHRndWxwLnNyYyggc3JjIClcclxuXHRcdFx0XHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMuaW5pdCgpKVxyXG5cdFx0XHRcdC5waXBlKHRzUHJvamVjdCgpKVxyXG5cdFx0XHQucGlwZShzb3VyY2VtYXBzLndyaXRlKCcuJywgeyBzb3VyY2VSb290OiAnLi4vc3JjLycsIGluY2x1ZGVDb250ZW50OiBmYWxzZSB9KSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCBkZXN0ICkpO1xyXG5cclxuXHR9KTtcclxuXHRcclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcImNsaWVudFR5cGVTY3JpcHRzXCIsXHJcblx0c3JjOiAnc3JjL21vZHVsZXMvKiovY2xpZW50LyoqLyoudHMnLFxyXG5cdGRlc3Q6ICdidWlsZC8nXHJcbn07XHJcbndhY2hBbGwucHVzaCh3YXRjaFRhc2spO1xyXG4oZnVuY3Rpb24obmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZyB8IHN0cmluZ1tdLCBkZXN0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcblx0dmFyIHRzUHJvamVjdDIgPSB0c2MuY3JlYXRlUHJvamVjdCgndHNjb25maWcuanNvbicpO1xyXG5cclxuXHQvLyBUcmFuc3BpbGVzICYgY29uY2F0ZW5hdGVzIGNsaWVudCdzIHR5cGVzY3JpcHQgZmlsZXMgaW50byBhIHNpbmdsZSBmaWxlIGluIC9wdWJsaWNcclxuXHRndWxwLnRhc2sobmFtZSwgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gbWFrZSBzdXJlIG1haW4udHMgZ29lcyBmaXJzdCB0byByZWdpc3RlciBhbmd1bGFyIG1vZHVsZXMgYW5kIG90aGVyIHN0dWZmIHRoYXQgbmVlZHMgZXhlY3V0aW5nIGZpcnN0LlxyXG5cdFx0Z3VscC5zcmMoIFsgJy4vc3JjL21vZHVsZXMvY29yZS9jbGllbnQvbWFpbi50cycsIHNyYyBhcyBzdHJpbmcgXSApXHJcblx0XHRcdFxyXG5cdFx0XHQucGlwZShzb3VyY2VtYXBzLmluaXQoKSlcclxuXHRcdFx0XHQucGlwZSh0c1Byb2plY3QyKCkpXHJcblx0XHRcdFx0LnBpcGUoY29uY2F0KCdtYWluLm1pbi5qcycpKVxyXG5cdFx0XHQucGlwZShzb3VyY2VtYXBzLndyaXRlKCcuJykpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdCggZGVzdCArICdwdWJsaWMvamF2YXNjcmlwdHMvJyApKTtcclxuXHR9KTtcclxuXHRcclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcIm15TGVzc1wiLFxyXG5cdHNyYzogJ3NyYy8qKi8qLmxlc3MnLFxyXG5cdGRlc3Q6ICdidWlsZC8nXHJcbn07XHJcbndhY2hBbGwucHVzaCh3YXRjaFRhc2spO1xyXG4oZnVuY3Rpb24obmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZyB8IHN0cmluZ1tdLCBkZXN0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcblx0Z3VscC50YXNrKCBuYW1lICwgZnVuY3Rpb24oKSB7XHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMuaW5pdCgpKVxyXG5cdFx0XHQucGlwZShsZXNzKHtcclxuXHRcdFx0XHRwYXRoczogWyBwYXRoLmpvaW4oX19kaXJuYW1lLCAnbGVzcycsICdpbmNsdWRlcycpXVxyXG5cdFx0XHR9KS5vbignZXJyb3InLCBnVXRpbC5sb2cpKVxyXG5cdFx0XHQucGlwZShzb3VyY2VtYXBzLndyaXRlKCcuJykpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdCggZGVzdCApKTtcclxuXHR9KTtcclxuXHJcbn0pKHdhdGNoVGFzay50YXNrTmFtZSwgd2F0Y2hUYXNrLnNyYywgd2F0Y2hUYXNrLmRlc3QpO1xyXG5cclxuLy9cclxuLy9cclxuXHJcbndhdGNoVGFzayA9IHtcclxuXHR0YXNrTmFtZTogXCJteVZpZXdzXCIsXHJcblx0c3JjOiAnc3JjL21vZHVsZXMvKiovY2xpZW50L3ZpZXdzLyoqLyouaHRtbCcsXHJcblx0ZGVzdDogJ2J1aWxkL3B1YmxpYy92aWV3cy8nXHJcbn07XHJcbndhY2hBbGwucHVzaCh3YXRjaFRhc2spO1xyXG4vLyBGbGF0dGVuIGlzIGJlaW5nIHVzZWQgdG8gcmVtb3ZlIHRoZSBzb3VyY2UncyByZWxhdGl2ZSBwYXRoXHJcbmltcG9ydCAqIGFzIGZsYXR0ZW4gZnJvbSAnZ3VscC1mbGF0dGVuJztcclxuKGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGVzdDogc3RyaW5nKTogdm9pZCB7XHJcblxyXG5cdGd1bHAudGFzayggbmFtZSAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0Z3VscC5zcmMoc3JjKVxyXG5cdFx0XHQucGlwZShmbGF0dGVuKCkpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdCggZGVzdCApKTtcclxuXHJcblx0fSk7XHJcbn0pKHdhdGNoVGFzay50YXNrTmFtZSwgd2F0Y2hUYXNrLnNyYywgd2F0Y2hUYXNrLmRlc3QpO1xyXG5cclxuLy9cclxuLy9cclxuXHJcbndhdGNoVGFzayA9IHtcclxuXHR0YXNrTmFtZTogXCJtb3ZlX3BsYWluX2ZpbGVzXCIsXHJcblx0c3JjOiBbJ3NyYy8qKi8qJywgJyFzcmMvKiovKi50cycsICchc3JjLyoqLyoubGVzcycsICchc3JjLyoqL2NsaWVudC92aWV3cy8qKi8qLmh0bWwnXSxcclxuXHRkZXN0OiAnYnVpbGQvJ1xyXG59O1xyXG53YWNoQWxsLnB1c2god2F0Y2hUYXNrKTtcclxuKGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGVzdDogc3RyaW5nKSB7XHJcblx0XHJcblx0Z3VscC50YXNrKG5hbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0Z3VscC5zcmMoc3JjKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoZGVzdCkpO1xyXG5cdH0pO1xyXG5cclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcImd1bHBmaWxlXCIsXHJcblx0c3JjOiAnLi9ndWxwZmlsZS50cycsXHJcblx0ZGVzdDogJydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZykge1xyXG5cdFxyXG5cdGd1bHAudGFzayhuYW1lLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB0c1Byb2plY3QgPSB0c2MuY3JlYXRlUHJvamVjdCgndHNjb25maWcuanNvbicpO1xyXG5cdFx0Z3VscC5zcmMoc3JjKVxyXG5cdFx0XHQucGlwZShzb3VyY2VtYXBzLmluaXQoKSlcclxuXHRcdFx0LnBpcGUodHNQcm9qZWN0KCkpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMud3JpdGUoKSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KGRlc3QpKTtcclxuXHR9KTtcclxuXHJcbn0pKHdhdGNoVGFzay50YXNrTmFtZSwgd2F0Y2hUYXNrLnNyYywgd2F0Y2hUYXNrLmRlc3QpO1xyXG5cclxuLy9cclxuLy9cclxuXHJcbndhdGNoVGFzayA9IHtcclxuXHR0YXNrTmFtZTogXCJ0ZXN0c1wiLFxyXG5cdHNyYzogJ3Rlc3RzLyoqLyoudHMnLFxyXG5cdGRlc3Q6ICd0ZXN0cydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZykge1xyXG5cdFxyXG5cdGd1bHAudGFzayhuYW1lLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB0c1Byb2plY3QgPSB0c2MuY3JlYXRlUHJvamVjdCgndHNjb25maWcuanNvbicpO1xyXG5cdFx0Z3VscC5zcmMoc3JjKVxyXG5cdFx0XHQucGlwZSh0c1Byb2plY3QoKSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KGRlc3QpKTtcclxuXHR9KTtcclxuXHJcbn0pKHdhdGNoVGFzay50YXNrTmFtZSwgd2F0Y2hUYXNrLnNyYywgd2F0Y2hUYXNrLmRlc3QpO1xyXG4vLyBcclxuLy8gXHJcbmd1bHAudGFzaygnd2FjaGEnLCBmdW5jdGlvbigpIHtcclxuXHR3YWNoQWxsLmZvckVhY2god2FjaGEgPT4ge1xyXG5cdFx0Y29uc29sZS5sb2coJ1dhdGNoaW5nJywgd2FjaGEudGFza05hbWUpO1xyXG5cdFx0Z3VscC53YXRjaCh3YWNoYS5zcmMsIFt3YWNoYS50YXNrTmFtZV0pO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbi8vIHNldCBhbGxUYXNrcyBhcyBhbiBhcnJheSBvZiBuYW1lcywgZXhhbXBsZTogWyd0eXBlc2NyaXB0cycsICdqYWRlcycsICdodG1scyddXHJcbnZhciBhbGxUYXNrcyA9IChmdW5jdGlvbigpe1xyXG5cdHZhciBhcnI6IHN0cmluZ1tdID0gW107XHJcblx0d2FjaEFsbC5mb3JFYWNoKHRhc2sgPT4ge1xyXG5cdFx0YXJyLnB1c2godGFzay50YXNrTmFtZSk7XHJcblx0fSk7XHJcblx0cmV0dXJuIGFycjtcclxufSkoKTtcclxuLy8gYWxsVGFza3MucHVzaCgnd2F0Y2hfYWxsJyk7XHJcblxyXG5ndWxwLnRhc2soJ2J1aWxkJywgZnVuY3Rpb24oKSB7XHJcblx0aWYocHJvY2Vzcy5lbnYuREVWX0VOVikge1xyXG5cclxuXHRcdGd1bHAuc3JjKFtcdCdub2RlX21vZHVsZXMvYW5ndWxhci9hbmd1bGFyLmpzJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvQHVpcm91dGVyL2FuZ3VsYXJqcy9yZWxlYXNlL2FuZ3VsYXItdWktcm91dGVyLm1pbi5qcycsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL0B1aXJvdXRlci9hbmd1bGFyanMvcmVsZWFzZS9hbmd1bGFyLXVpLXJvdXRlci5taW4uanMubWFwJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci1hbmltYXRlL2FuZ3VsYXItYW5pbWF0ZS5taW4uanMnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLWFuaW1hdGUvYW5ndWxhci1hbmltYXRlLm1pbi5qcy5tYXAnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLWFyaWEvYW5ndWxhci1hcmlhLm1pbi5qcycsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItYXJpYS9hbmd1bGFyLWFyaWEubWluLmpzLm1hcCcsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItbWVzc2FnZXMvYW5ndWxhci1tZXNzYWdlcy5taW4uanMnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLW1lc3NhZ2VzL2FuZ3VsYXItbWVzc2FnZXMubWluLmpzLm1hcCcsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItY29va2llcy9hbmd1bGFyLWNvb2tpZXMubWluLmpzJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci1jb29raWVzL2FuZ3VsYXItY29va2llcy5taW4uanMubWFwJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci1zYW5pdGl6ZS9hbmd1bGFyLXNhbml0aXplLm1pbi5qcycsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItc2FuaXRpemUvYW5ndWxhci1zYW5pdGl6ZS5taW4uanMubWFwJyxcclxuXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItbWF0ZXJpYWwvYW5ndWxhci1tYXRlcmlhbC5qcyddKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9qYXZhc2NyaXB0cy9hbmd1bGFyJykpO1xyXG5cclxuXHRcdGd1bHAuc3JjKFsgJ25vZGVfbW9kdWxlcy9hbmd1bGFyLW1hdGVyaWFsL2FuZ3VsYXItbWF0ZXJpYWwubWluLmNzcyddKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9zdHlsZXNoZWV0cycpKTtcclxuXHJcblx0XHRndWxwLnNyYygnbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvZGlzdC9zb2NrZXQuaW8uanMnKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9qYXZhc2NyaXB0cycpKTtcclxuXHRcdGd1bHAuc3JjKCdub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9kaXN0L3NvY2tldC5pby5qcy5tYXAnKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9qYXZhc2NyaXB0cycpKTtcclxuXHJcblx0XHRndWxwLnNyYygnbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcycpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdCgnYnVpbGQvcHVibGljL3N0eWxlc2hlZXRzJykpO1xyXG5cdFx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3MubWFwJylcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvc3R5bGVzaGVldHMnKSk7XHJcblx0fVxyXG5cclxuXHRndWxwLnNyYyhbJ25vZGVfbW9kdWxlcy9hbmd1bGFyLXRyYW5zbGF0ZS9kaXN0L2FuZ3VsYXItdHJhbnNsYXRlLm1pbi5qcycsXHJcblx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci10cmFuc2xhdGUvZGlzdC9hbmd1bGFyLXRyYW5zbGF0ZS1sb2FkZXItc3RhdGljLWZpbGVzLycrXHJcblx0XHRcdFx0J2FuZ3VsYXItdHJhbnNsYXRlLWxvYWRlci1zdGF0aWMtZmlsZXMubWluLmpzJ10pXHJcblx0XHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9qYXZhc2NyaXB0cy9hbmd1bGFyJykpO1xyXG5cclxuXHRndWxwLnNyYygnbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9kaXN0L2ZvbnRzLyonKVxyXG5cdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvZm9udHMnKSk7XHJcblxyXG5cdC8vIGd1bHAuc3JjKCdub2RlX21vZHVsZXMvanF1ZXJ5L2Rpc3QvanF1ZXJ5Lm1pbi5qcycpXHJcblx0Ly8gXHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9qYXZhc2NyaXB0cycpKTtcclxufSk7XHJcbmFsbFRhc2tzLnB1c2goJ2J1aWxkJywgJ3dhY2hhJyk7XHJcblxyXG4vLyBAdHlwZXMgYXJlIGluY29uc2lzdGVudDpcclxuZ3VscC50YXNrKCdkZWZhdWx0JywgYWxsVGFza3MgYXMgYW55ICk7IC8vIHNob3VsZCBiZTogZ3VscC5wYXJhbGxlbCggYWxsVGFza3MgKTtcclxuIl19
