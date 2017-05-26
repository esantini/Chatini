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
        gulp.src(['./src/modules/core/client/main.ts', clientScripts])
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
    gulp.src('node_modules/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('build/public/fonts'));
    // gulp.src('node_modules/jquery/dist/jquery.min.js')
    // 	.pipe(gulp.dest('build/public/javascripts'));
});
allTasks.push('build', 'wacha');
gulp.task('default', allTasks);

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFFeEMscURBQXFEO0lBQ3JELGlEQUFpRDtBQUNsRCxDQUFDLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRWhDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBRSxDQUFDIiwiZmlsZSI6Imd1bHBmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuXHRHZW5lcmF0ZWQgZnJvbSB0eXBlc2NyaXB0IGZpbGVcclxuKi9cclxuXHJcbmltcG9ydCAqIGFzIGd1bHAgZnJvbSAnZ3VscCc7XHJcbmltcG9ydCAqIGFzIGdVdGlsIGZyb20gJ2d1bHAtdXRpbCc7XHJcbmltcG9ydCAqIGFzIHRzYyBmcm9tICdndWxwLXR5cGVzY3JpcHQnO1xyXG5pbXBvcnQgKiBhcyBzb3VyY2VtYXBzIGZyb20gJ2d1bHAtc291cmNlbWFwcyc7XHJcbmltcG9ydCAqIGFzIGxlc3MgZnJvbSAnZ3VscC1sZXNzJztcclxuaW1wb3J0ICogYXMgY29uY2F0IGZyb20gJ2d1bHAtY29uY2F0JztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbi8vXHJcbmludGVyZmFjZSBUYXNrVG9XYXRjaCB7XHJcblx0dGFza05hbWU6IHN0cmluZyxcclxuXHRzcmM6IHN0cmluZyB8IHN0cmluZ1tdLFxyXG5cdGRlc3Q6IHN0cmluZ1xyXG59XHJcbnZhciB3YXRjaFRhc2s6IFRhc2tUb1dhdGNoO1xyXG52YXIgd2FjaEFsbDogQXJyYXk8VGFza1RvV2F0Y2g+ID0gW107XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcIm15VHlwZVNjcmlwdHNcIixcclxuXHRzcmM6ICdzcmMvKiovKi50cycsXHJcblx0ZGVzdDogJ2J1aWxkLydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuXHR2YXIgdHNQcm9qZWN0ID0gdHNjLmNyZWF0ZVByb2plY3QoJ3RzY29uZmlnLmpzb24nKTtcclxuXHJcblx0dmFyIHRzUHJvamVjdDIgPSB0c2MuY3JlYXRlUHJvamVjdCgndHNjb25maWcuanNvbicpO1xyXG5cdHZhciBjbGllbnRTY3JpcHRzID0gJ3NyYy9tb2R1bGVzLyoqL2NsaWVudC8qKi8qLnRzJztcclxuXHJcblx0Ly8gVHJhbnNwaWxlcyB0eXBlc2NyaXB0IGZpbGVzIGZyb20gdGhlIHNvdXJjZSB0byB0aGUgYnVpbGQuXHJcblx0Z3VscC50YXNrKG5hbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHJcblx0XHRndWxwLnNyYyggWyBzcmMgYXMgc3RyaW5nLCAnIScrY2xpZW50U2NyaXB0cyBdIClcclxuXHRcdFx0XHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMuaW5pdCgpKVxyXG5cdFx0XHRcdC5waXBlKHRzUHJvamVjdCgpKVxyXG5cdFx0XHQucGlwZShzb3VyY2VtYXBzLndyaXRlKCcuJywgeyBzb3VyY2VSb290OiAnLi4vc3JjLycsIGluY2x1ZGVDb250ZW50OiBmYWxzZSB9KSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCBkZXN0ICkpO1xyXG5cclxuXHRcdGd1bHAuc3JjKCBbICcuL3NyYy9tb2R1bGVzL2NvcmUvY2xpZW50L21haW4udHMnLCBjbGllbnRTY3JpcHRzIF0gKVxyXG5cdFx0XHRcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy5pbml0KCkpXHJcblx0XHRcdFx0LnBpcGUodHNQcm9qZWN0MigpKVxyXG5cdFx0XHRcdC5waXBlKGNvbmNhdCgnbWFpbi5taW4uanMnKSlcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy53cml0ZSgnLicpKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoIGRlc3QgKyAncHVibGljL2phdmFzY3JpcHRzLycgKSk7XHJcblx0fSk7XHJcblx0XHJcbn0pKHdhdGNoVGFzay50YXNrTmFtZSwgd2F0Y2hUYXNrLnNyYywgd2F0Y2hUYXNrLmRlc3QpO1xyXG5cclxuLy9cclxuLy9cclxuXHJcbndhdGNoVGFzayA9IHtcclxuXHR0YXNrTmFtZTogXCJteUxlc3NcIixcclxuXHRzcmM6ICdzcmMvKiovKi5sZXNzJyxcclxuXHRkZXN0OiAnYnVpbGQvJ1xyXG59O1xyXG53YWNoQWxsLnB1c2god2F0Y2hUYXNrKTtcclxuKGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGVzdDogc3RyaW5nKTogdm9pZCB7XHJcblxyXG5cdGd1bHAudGFzayggbmFtZSAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0Z3VscC5zcmMoc3JjKVxyXG5cdFx0XHQucGlwZShzb3VyY2VtYXBzLmluaXQoKSlcclxuXHRcdFx0LnBpcGUobGVzcyh7XHJcblx0XHRcdFx0cGF0aHM6IFsgcGF0aC5qb2luKF9fZGlybmFtZSwgJ2xlc3MnLCAnaW5jbHVkZXMnKV1cclxuXHRcdFx0fSkub24oJ2Vycm9yJywgZ1V0aWwubG9nKSlcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy53cml0ZSgnLicpKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoIGRlc3QgKSk7XHJcblx0fSk7XHJcblxyXG59KSh3YXRjaFRhc2sudGFza05hbWUsIHdhdGNoVGFzay5zcmMsIHdhdGNoVGFzay5kZXN0KTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwibXlWaWV3c1wiLFxyXG5cdHNyYzogJ3NyYy9tb2R1bGVzLyoqL2NsaWVudC92aWV3cy8qKi8qLmh0bWwnLFxyXG5cdGRlc3Q6ICdidWlsZC9wdWJsaWMvdmlld3MvJ1xyXG59O1xyXG53YWNoQWxsLnB1c2god2F0Y2hUYXNrKTtcclxuLy8gRmxhdHRlbiBpcyBiZWluZyB1c2VkIHRvIHJlbW92ZSB0aGUgc291cmNlJ3MgcmVsYXRpdmUgcGF0aFxyXG5pbXBvcnQgKiBhcyBmbGF0dGVuIGZyb20gJ2d1bHAtZmxhdHRlbic7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuXHRndWxwLnRhc2soIG5hbWUgLCBmdW5jdGlvbigpIHtcclxuXHRcdGd1bHAuc3JjKHNyYylcclxuXHRcdFx0LnBpcGUoZmxhdHRlbigpKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoIGRlc3QgKSk7XHJcblxyXG5cdH0pO1xyXG59KSh3YXRjaFRhc2sudGFza05hbWUsIHdhdGNoVGFzay5zcmMsIHdhdGNoVGFzay5kZXN0KTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwibW92ZV9wbGFpbl9maWxlc1wiLFxyXG5cdHNyYzogWydzcmMvKiovKicsICchc3JjLyoqLyoudHMnLCAnIXNyYy8qKi8qLmxlc3MnLCAnIXNyYy8qKi9jbGllbnQvdmlld3MvKiovKi5odG1sJ10sXHJcblx0ZGVzdDogJ2J1aWxkLydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZykge1xyXG5cdFxyXG5cdGd1bHAudGFzayhuYW1lLCBmdW5jdGlvbigpIHtcclxuXHRcdGd1bHAuc3JjKHNyYylcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KGRlc3QpKTtcclxuXHR9KTtcclxuXHJcbn0pKHdhdGNoVGFzay50YXNrTmFtZSwgd2F0Y2hUYXNrLnNyYywgd2F0Y2hUYXNrLmRlc3QpO1xyXG5cclxuLy9cclxuLy9cclxuXHJcbndhdGNoVGFzayA9IHtcclxuXHR0YXNrTmFtZTogXCJndWxwZmlsZVwiLFxyXG5cdHNyYzogJy4vZ3VscGZpbGUudHMnLFxyXG5cdGRlc3Q6ICcnXHJcbn07XHJcbndhY2hBbGwucHVzaCh3YXRjaFRhc2spO1xyXG4oZnVuY3Rpb24obmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZyB8IHN0cmluZ1tdLCBkZXN0OiBzdHJpbmcpIHtcclxuXHRcclxuXHRndWxwLnRhc2sobmFtZSwgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdHNQcm9qZWN0ID0gdHNjLmNyZWF0ZVByb2plY3QoJ3RzY29uZmlnLmpzb24nKTtcclxuXHRcdGd1bHAuc3JjKHNyYylcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy5pbml0KCkpXHJcblx0XHRcdC5waXBlKHRzUHJvamVjdCgpKVxyXG5cdFx0XHQucGlwZShzb3VyY2VtYXBzLndyaXRlKCkpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdChkZXN0KSk7XHJcblx0fSk7XHJcblxyXG59KSh3YXRjaFRhc2sudGFza05hbWUsIHdhdGNoVGFzay5zcmMsIHdhdGNoVGFzay5kZXN0KTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwidGVzdHNcIixcclxuXHRzcmM6ICd0ZXN0cy8qKi8qLnRzJyxcclxuXHRkZXN0OiAndGVzdHMnXHJcbn07XHJcbndhY2hBbGwucHVzaCh3YXRjaFRhc2spO1xyXG4oZnVuY3Rpb24obmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZyB8IHN0cmluZ1tdLCBkZXN0OiBzdHJpbmcpIHtcclxuXHRcclxuXHRndWxwLnRhc2sobmFtZSwgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdHNQcm9qZWN0ID0gdHNjLmNyZWF0ZVByb2plY3QoJ3RzY29uZmlnLmpzb24nKTtcclxuXHRcdGd1bHAuc3JjKHNyYylcclxuXHRcdFx0LnBpcGUodHNQcm9qZWN0KCkpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdChkZXN0KSk7XHJcblx0fSk7XHJcblxyXG59KSh3YXRjaFRhc2sudGFza05hbWUsIHdhdGNoVGFzay5zcmMsIHdhdGNoVGFzay5kZXN0KTtcclxuLy8gXHJcbi8vIFxyXG5ndWxwLnRhc2soJ3dhY2hhJywgZnVuY3Rpb24oKSB7XHJcblx0d2FjaEFsbC5mb3JFYWNoKHdhY2hhID0+IHtcclxuXHRcdGNvbnNvbGUubG9nKCdXYXRjaGluZycsIHdhY2hhLnRhc2tOYW1lKTtcclxuXHRcdGd1bHAud2F0Y2god2FjaGEuc3JjLCBbd2FjaGEudGFza05hbWVdKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyBzZXQgYWxsVGFza3MgYXMgYW4gYXJyYXkgb2YgbmFtZXMsIGV4YW1wbGU6IFsndHlwZXNjcmlwdHMnLCAnamFkZXMnLCAnaHRtbHMnXVxyXG52YXIgYWxsVGFza3MgPSAoZnVuY3Rpb24oKXtcclxuXHR2YXIgYXJyOiBzdHJpbmdbXSA9IFtdO1xyXG5cdHdhY2hBbGwuZm9yRWFjaCh0YXNrID0+IHtcclxuXHRcdGFyci5wdXNoKHRhc2sudGFza05hbWUpO1xyXG5cdH0pO1xyXG5cdHJldHVybiBhcnI7XHJcbn0pKCk7XHJcbi8vIGFsbFRhc2tzLnB1c2goJ3dhdGNoX2FsbCcpO1xyXG5cclxuZ3VscC50YXNrKCdidWlsZCcsIGZ1bmN0aW9uKCkge1xyXG5cdGlmKHByb2Nlc3MuZW52LkRFVl9FTlYpIHtcclxuXHJcblx0XHRndWxwLnNyYyhbXHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXIvYW5ndWxhci5qcycsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL0B1aXJvdXRlci9hbmd1bGFyanMvcmVsZWFzZS9hbmd1bGFyLXVpLXJvdXRlci5taW4uanMnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9AdWlyb3V0ZXIvYW5ndWxhcmpzL3JlbGVhc2UvYW5ndWxhci11aS1yb3V0ZXIubWluLmpzLm1hcCcsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItYW5pbWF0ZS9hbmd1bGFyLWFuaW1hdGUubWluLmpzJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci1hbmltYXRlL2FuZ3VsYXItYW5pbWF0ZS5taW4uanMubWFwJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci1hcmlhL2FuZ3VsYXItYXJpYS5taW4uanMnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLWFyaWEvYW5ndWxhci1hcmlhLm1pbi5qcy5tYXAnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLW1lc3NhZ2VzL2FuZ3VsYXItbWVzc2FnZXMubWluLmpzJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci1tZXNzYWdlcy9hbmd1bGFyLW1lc3NhZ2VzLm1pbi5qcy5tYXAnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLW1hdGVyaWFsL2FuZ3VsYXItbWF0ZXJpYWwuanMnXSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMvYW5ndWxhcicpKTtcclxuXHJcblx0XHRndWxwLnNyYyhbICdub2RlX21vZHVsZXMvYW5ndWxhci1tYXRlcmlhbC9hbmd1bGFyLW1hdGVyaWFsLm1pbi5jc3MnXSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvc3R5bGVzaGVldHMnKSk7XHJcblxyXG5cdFx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2Rpc3Qvc29ja2V0LmlvLmpzJylcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMnKSk7XHJcblx0XHRndWxwLnNyYygnbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvZGlzdC9zb2NrZXQuaW8uanMubWFwJylcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMnKSk7XHJcblxyXG5cdFx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9zdHlsZXNoZWV0cycpKTtcclxuXHRcdGd1bHAuc3JjKCdub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzLm1hcCcpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdCgnYnVpbGQvcHVibGljL3N0eWxlc2hlZXRzJykpO1xyXG5cdH1cclxuXHJcblx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9mb250cy8qJylcclxuXHRcdC5waXBlKGd1bHAuZGVzdCgnYnVpbGQvcHVibGljL2ZvbnRzJykpO1xyXG5cclxuXHQvLyBndWxwLnNyYygnbm9kZV9tb2R1bGVzL2pxdWVyeS9kaXN0L2pxdWVyeS5taW4uanMnKVxyXG5cdC8vIFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMnKSk7XHJcbn0pO1xyXG5hbGxUYXNrcy5wdXNoKCdidWlsZCcsICd3YWNoYScpO1xyXG5cclxuZ3VscC50YXNrKCdkZWZhdWx0JywgYWxsVGFza3MgKTtcclxuIl19
