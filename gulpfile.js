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
var rename = require("gulp-rename");
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
    src: 'tests/src/**/*.ts',
    dest: 'tests/dest'
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
    taskName: "myTypes",
    src: 'src/myTypes.d.ts',
    dest: 'node_modules/@types/mytypes/'
};
wachAll.push(watchTask);
(function (name, src, dest) {
    gulp.task(name, function () {
        gulp.src(src)
            .pipe(rename('index.d.ts'))
            .pipe(gulp.dest(dest));
    });
})(watchTask.taskName, watchTask.src, watchTask.dest);
/**
 * Watch for file changes and re-run tests on each change
 */
var Karma = require('karma');
gulp.task('Run_Karma_Tests', function (done) {
    new Karma.Server({
        configFile: __dirname + '/tests/karma.conf.js'
    }, done).start();
});
// 
// 
gulp.task('wacha', function () {
    wachAll.forEach(function (wacha) {
        console.log('Watching', wacha.taskName);
        gulp.watch(wacha.src, [wacha.taskName]); // casting as WatchOptions because of error TS2345:
        // error TS2345: Argument of type 'string[]' is not assignable to parameter of type 'WatchOptions | undefined'
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
allTasks.push('build', 'wacha'); //, 'Run_Karma_Tests'
// @types are inconsistent:
gulp.task('default', allTasks); // should be: gulp.parallel( allTasks );

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImd1bHBmaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7RUFFRTs7QUFFRiwyQkFBNkI7QUFDN0IsaUNBQW1DO0FBQ25DLHFDQUF1QztBQUN2Qyw0Q0FBOEM7QUFDOUMsZ0NBQWtDO0FBQ2xDLG9DQUFzQztBQUN0QyxvQ0FBc0M7QUFDdEMsMkJBQTZCO0FBUTdCLElBQUksU0FBc0IsQ0FBQztBQUMzQixJQUFJLE9BQU8sR0FBdUIsRUFBRSxDQUFDO0FBRXJDLEVBQUU7QUFDRixFQUFFO0FBRUYsU0FBUyxHQUFHO0lBQ1gsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsNkJBQTZCLENBQUM7SUFDbkQsSUFBSSxFQUFFLFFBQVE7Q0FDZCxDQUFDO0FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4QixDQUFDLFVBQVMsSUFBWSxFQUFFLEdBQXNCLEVBQUUsSUFBWTtJQUUzRCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRW5ELDREQUE0RDtJQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUVmLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFO2FBRWIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUM3RSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFDO0lBRTNCLENBQUMsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV0RCxFQUFFO0FBQ0YsRUFBRTtBQUVGLFNBQVMsR0FBRztJQUNYLFFBQVEsRUFBRSxtQkFBbUI7SUFDN0IsR0FBRyxFQUFFLCtCQUErQjtJQUNwQyxJQUFJLEVBQUUsUUFBUTtDQUNkLENBQUM7QUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsVUFBUyxJQUFZLEVBQUUsR0FBc0IsRUFBRSxJQUFZO0lBRTNELElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFcEQsb0ZBQW9GO0lBQ3BGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBRWYsdUdBQXVHO1FBQ3ZHLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBRSxtQ0FBbUMsRUFBRSxHQUFhLENBQUUsQ0FBRTthQUVoRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksR0FBRyxxQkFBcUIsQ0FBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXRELEVBQUU7QUFDRixFQUFFO0FBRUYsU0FBUyxHQUFHO0lBQ1gsUUFBUSxFQUFFLFFBQVE7SUFDbEIsR0FBRyxFQUFFLGVBQWU7SUFDcEIsSUFBSSxFQUFFLFFBQVE7Q0FDZCxDQUFDO0FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4QixDQUFDLFVBQVMsSUFBWSxFQUFFLEdBQXNCLEVBQUUsSUFBWTtJQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksRUFBRztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNWLEtBQUssRUFBRSxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNsRCxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUVKLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdEQsRUFBRTtBQUNGLEVBQUU7QUFFRixTQUFTLEdBQUc7SUFDWCxRQUFRLEVBQUUsU0FBUztJQUNuQixHQUFHLEVBQUUsdUNBQXVDO0lBQzVDLElBQUksRUFBRSxxQkFBcUI7Q0FDM0IsQ0FBQztBQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEIsNkRBQTZEO0FBQzdELHNDQUF3QztBQUN4QyxDQUFDLFVBQVMsSUFBWSxFQUFFLEdBQXNCLEVBQUUsSUFBWTtJQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksRUFBRztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDLENBQUM7SUFFM0IsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXRELEVBQUU7QUFDRixFQUFFO0FBRUYsU0FBUyxHQUFHO0lBQ1gsUUFBUSxFQUFFLGtCQUFrQjtJQUM1QixHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGdDQUFnQyxDQUFDO0lBQ3JGLElBQUksRUFBRSxRQUFRO0NBQ2QsQ0FBQztBQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEIsQ0FBQyxVQUFTLElBQVksRUFBRSxHQUFzQixFQUFFLElBQVk7SUFFM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXRELEVBQUU7QUFDRixFQUFFO0FBRUYsU0FBUyxHQUFHO0lBQ1gsUUFBUSxFQUFFLFVBQVU7SUFDcEIsR0FBRyxFQUFFLGVBQWU7SUFDcEIsSUFBSSxFQUFFLEVBQUU7Q0FDUixDQUFDO0FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4QixDQUFDLFVBQVMsSUFBWSxFQUFFLEdBQXNCLEVBQUUsSUFBWTtJQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNmLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXRELEVBQUU7QUFDRixFQUFFO0FBRUYsU0FBUyxHQUFHO0lBQ1gsUUFBUSxFQUFFLE9BQU87SUFDakIsR0FBRyxFQUFFLG1CQUFtQjtJQUN4QixJQUFJLEVBQUUsWUFBWTtDQUNsQixDQUFDO0FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4QixDQUFDLFVBQVMsSUFBWSxFQUFFLEdBQXNCLEVBQUUsSUFBWTtJQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNmLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXRELEVBQUU7QUFDRixFQUFFO0FBRUYsU0FBUyxHQUFHO0lBQ1gsUUFBUSxFQUFFLFNBQVM7SUFDbkIsR0FBRyxFQUFFLGtCQUFrQjtJQUN2QixJQUFJLEVBQUUsOEJBQThCO0NBQ3BDLENBQUM7QUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsVUFBUyxJQUFZLEVBQUUsR0FBc0IsRUFBRSxJQUFZO0lBRTNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBRWYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7QUFFSixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBR3REOztHQUVHO0FBQ0gsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxJQUFJO0lBQ3pDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNmLFVBQVUsRUFBRSxTQUFTLEdBQUcsc0JBQXNCO0tBQy9DLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHO0FBQ0gsR0FBRztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ2xCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFzQixDQUFDLENBQUMsQ0FBQyxtREFBbUQ7UUFDakgsOEdBQThHO0lBQy9HLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSCxnRkFBZ0Y7QUFDaEYsSUFBSSxRQUFRLEdBQUcsQ0FBQztJQUNmLElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQztJQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtRQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDWixDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ0wsOEJBQThCO0FBRTlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ2xCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUUsaUNBQWlDO1lBQ3pDLG1FQUFtRTtZQUNuRSx1RUFBdUU7WUFDdkUscURBQXFEO1lBQ3JELHlEQUF5RDtZQUN6RCwrQ0FBK0M7WUFDL0MsbURBQW1EO1lBQ25ELHVEQUF1RDtZQUN2RCwyREFBMkQ7WUFDM0QscURBQXFEO1lBQ3JELHlEQUF5RDtZQUN6RCx1REFBdUQ7WUFDdkQsMkRBQTJEO1lBRTNELG1EQUFtRCxDQUFDLENBQUM7YUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBRSx3REFBd0QsQ0FBQyxDQUFDO2FBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxDQUFDO2FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLHFEQUFxRCxDQUFDO2FBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDO2FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxDQUFDO2FBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLDhEQUE4RDtRQUN0RSw0RUFBNEU7WUFDM0UsOENBQThDLENBQUMsQ0FBQztTQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUM7SUFFdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQztTQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFFeEMscURBQXFEO0lBQ3JELGlEQUFpRDtBQUNsRCxDQUFDLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMscUJBQXFCO0FBRXRELDJCQUEyQjtBQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFlLENBQUUsQ0FBQyxDQUFDLHdDQUF3QyIsImZpbGUiOiJndWxwZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcblx0R2VuZXJhdGVkIGZyb20gdHlwZXNjcmlwdCBmaWxlXHJcbiovXHJcblxyXG5pbXBvcnQgKiBhcyBndWxwIGZyb20gJ2d1bHAnO1xyXG5pbXBvcnQgKiBhcyBnVXRpbCBmcm9tICdndWxwLXV0aWwnO1xyXG5pbXBvcnQgKiBhcyB0c2MgZnJvbSAnZ3VscC10eXBlc2NyaXB0JztcclxuaW1wb3J0ICogYXMgc291cmNlbWFwcyBmcm9tICdndWxwLXNvdXJjZW1hcHMnO1xyXG5pbXBvcnQgKiBhcyBsZXNzIGZyb20gJ2d1bHAtbGVzcyc7XHJcbmltcG9ydCAqIGFzIGNvbmNhdCBmcm9tICdndWxwLWNvbmNhdCc7XHJcbmltcG9ydCAqIGFzIHJlbmFtZSBmcm9tICdndWxwLXJlbmFtZSc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG4vL1xyXG5pbnRlcmZhY2UgVGFza1RvV2F0Y2gge1xyXG5cdHRhc2tOYW1lOiBzdHJpbmcsXHJcblx0c3JjOiBzdHJpbmcgfCBzdHJpbmdbXSxcclxuXHRkZXN0OiBzdHJpbmdcclxufVxyXG52YXIgd2F0Y2hUYXNrOiBUYXNrVG9XYXRjaDtcclxudmFyIHdhY2hBbGw6IEFycmF5PFRhc2tUb1dhdGNoPiA9IFtdO1xyXG5cclxuLy9cclxuLy9cclxuXHJcbndhdGNoVGFzayA9IHtcclxuXHR0YXNrTmFtZTogXCJzZXJ2ZXJUeXBlU2NyaXB0c1wiLFxyXG5cdHNyYzogWydzcmMvKiovKi50cycsICchc3JjL21vZHVsZXMvKiovY2xpZW50LyoqLyonXSxcclxuXHRkZXN0OiAnYnVpbGQvJ1xyXG59O1xyXG53YWNoQWxsLnB1c2god2F0Y2hUYXNrKTtcclxuKGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGVzdDogc3RyaW5nKTogdm9pZCB7XHJcblxyXG5cdHZhciB0c1Byb2plY3QgPSB0c2MuY3JlYXRlUHJvamVjdCgndHNjb25maWcuanNvbicpO1xyXG5cclxuXHQvLyBUcmFuc3BpbGVzIHR5cGVzY3JpcHQgZmlsZXMgZnJvbSB0aGUgc291cmNlIHRvIHRoZSBidWlsZC5cclxuXHRndWxwLnRhc2sobmFtZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcclxuXHRcdGd1bHAuc3JjKCBzcmMgKVxyXG5cdFx0XHRcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy5pbml0KCkpXHJcblx0XHRcdFx0LnBpcGUodHNQcm9qZWN0KCkpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMud3JpdGUoJy4nLCB7IHNvdXJjZVJvb3Q6ICcuLi9zcmMvJywgaW5jbHVkZUNvbnRlbnQ6IGZhbHNlIH0pKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoIGRlc3QgKSk7XHJcblxyXG5cdH0pO1xyXG5cdFxyXG59KSh3YXRjaFRhc2sudGFza05hbWUsIHdhdGNoVGFzay5zcmMsIHdhdGNoVGFzay5kZXN0KTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwiY2xpZW50VHlwZVNjcmlwdHNcIixcclxuXHRzcmM6ICdzcmMvbW9kdWxlcy8qKi9jbGllbnQvKiovKi50cycsXHJcblx0ZGVzdDogJ2J1aWxkLydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuXHR2YXIgdHNQcm9qZWN0MiA9IHRzYy5jcmVhdGVQcm9qZWN0KCd0c2NvbmZpZy5qc29uJyk7XHJcblxyXG5cdC8vIFRyYW5zcGlsZXMgJiBjb25jYXRlbmF0ZXMgY2xpZW50J3MgdHlwZXNjcmlwdCBmaWxlcyBpbnRvIGEgc2luZ2xlIGZpbGUgaW4gL3B1YmxpY1xyXG5cdGd1bHAudGFzayhuYW1lLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBtYWtlIHN1cmUgbWFpbi50cyBnb2VzIGZpcnN0IHRvIHJlZ2lzdGVyIGFuZ3VsYXIgbW9kdWxlcyBhbmQgb3RoZXIgc3R1ZmYgdGhhdCBuZWVkcyBleGVjdXRpbmcgZmlyc3QuXHJcblx0XHRndWxwLnNyYyggWyAnLi9zcmMvbW9kdWxlcy9jb3JlL2NsaWVudC9tYWluLnRzJywgc3JjIGFzIHN0cmluZyBdIClcclxuXHRcdFx0XHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMuaW5pdCgpKVxyXG5cdFx0XHRcdC5waXBlKHRzUHJvamVjdDIoKSlcclxuXHRcdFx0XHQucGlwZShjb25jYXQoJ21haW4ubWluLmpzJykpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMud3JpdGUoJy4nKSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCBkZXN0ICsgJ3B1YmxpYy9qYXZhc2NyaXB0cy8nICkpO1xyXG5cdH0pO1xyXG5cdFxyXG59KSh3YXRjaFRhc2sudGFza05hbWUsIHdhdGNoVGFzay5zcmMsIHdhdGNoVGFzay5kZXN0KTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwibXlMZXNzXCIsXHJcblx0c3JjOiAnc3JjLyoqLyoubGVzcycsXHJcblx0ZGVzdDogJ2J1aWxkLydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuXHRndWxwLnRhc2soIG5hbWUgLCBmdW5jdGlvbigpIHtcclxuXHRcdGd1bHAuc3JjKHNyYylcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy5pbml0KCkpXHJcblx0XHRcdC5waXBlKGxlc3Moe1xyXG5cdFx0XHRcdHBhdGhzOiBbIHBhdGguam9pbihfX2Rpcm5hbWUsICdsZXNzJywgJ2luY2x1ZGVzJyldXHJcblx0XHRcdH0pLm9uKCdlcnJvcicsIGdVdGlsLmxvZykpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMud3JpdGUoJy4nKSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCBkZXN0ICkpO1xyXG5cdH0pO1xyXG5cclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcIm15Vmlld3NcIixcclxuXHRzcmM6ICdzcmMvbW9kdWxlcy8qKi9jbGllbnQvdmlld3MvKiovKi5odG1sJyxcclxuXHRkZXN0OiAnYnVpbGQvcHVibGljL3ZpZXdzLydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbi8vIEZsYXR0ZW4gaXMgYmVpbmcgdXNlZCB0byByZW1vdmUgdGhlIHNvdXJjZSdzIHJlbGF0aXZlIHBhdGhcclxuaW1wb3J0ICogYXMgZmxhdHRlbiBmcm9tICdndWxwLWZsYXR0ZW4nO1xyXG4oZnVuY3Rpb24obmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZyB8IHN0cmluZ1tdLCBkZXN0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcblx0Z3VscC50YXNrKCBuYW1lICwgZnVuY3Rpb24oKSB7XHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKGZsYXR0ZW4oKSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCBkZXN0ICkpO1xyXG5cclxuXHR9KTtcclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcIm1vdmVfcGxhaW5fZmlsZXNcIixcclxuXHRzcmM6IFsnc3JjLyoqLyonLCAnIXNyYy8qKi8qLnRzJywgJyFzcmMvKiovKi5sZXNzJywgJyFzcmMvKiovY2xpZW50L3ZpZXdzLyoqLyouaHRtbCddLFxyXG5cdGRlc3Q6ICdidWlsZC8nXHJcbn07XHJcbndhY2hBbGwucHVzaCh3YXRjaFRhc2spO1xyXG4oZnVuY3Rpb24obmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZyB8IHN0cmluZ1tdLCBkZXN0OiBzdHJpbmcpIHtcclxuXHRcclxuXHRndWxwLnRhc2sobmFtZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdChkZXN0KSk7XHJcblx0fSk7XHJcblxyXG59KSh3YXRjaFRhc2sudGFza05hbWUsIHdhdGNoVGFzay5zcmMsIHdhdGNoVGFzay5kZXN0KTtcclxuXHJcbi8vXHJcbi8vXHJcblxyXG53YXRjaFRhc2sgPSB7XHJcblx0dGFza05hbWU6IFwiZ3VscGZpbGVcIixcclxuXHRzcmM6ICcuL2d1bHBmaWxlLnRzJyxcclxuXHRkZXN0OiAnJ1xyXG59O1xyXG53YWNoQWxsLnB1c2god2F0Y2hUYXNrKTtcclxuKGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGVzdDogc3RyaW5nKSB7XHJcblx0XHJcblx0Z3VscC50YXNrKG5hbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHRzUHJvamVjdCA9IHRzYy5jcmVhdGVQcm9qZWN0KCd0c2NvbmZpZy5qc29uJyk7XHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMuaW5pdCgpKVxyXG5cdFx0XHQucGlwZSh0c1Byb2plY3QoKSlcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy53cml0ZSgpKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoZGVzdCkpO1xyXG5cdH0pO1xyXG5cclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcInRlc3RzXCIsXHJcblx0c3JjOiAndGVzdHMvc3JjLyoqLyoudHMnLFxyXG5cdGRlc3Q6ICd0ZXN0cy9kZXN0J1xyXG59O1xyXG53YWNoQWxsLnB1c2god2F0Y2hUYXNrKTtcclxuKGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcgfCBzdHJpbmdbXSwgZGVzdDogc3RyaW5nKSB7XHJcblx0XHJcblx0Z3VscC50YXNrKG5hbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHRzUHJvamVjdCA9IHRzYy5jcmVhdGVQcm9qZWN0KCd0c2NvbmZpZy5qc29uJyk7XHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKHNvdXJjZW1hcHMuaW5pdCgpKVxyXG5cdFx0XHQucGlwZSh0c1Byb2plY3QoKSlcclxuXHRcdFx0LnBpcGUoc291cmNlbWFwcy53cml0ZSgpKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoZGVzdCkpO1xyXG5cdH0pO1xyXG5cclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG4vL1xyXG4vL1xyXG5cclxud2F0Y2hUYXNrID0ge1xyXG5cdHRhc2tOYW1lOiBcIm15VHlwZXNcIixcclxuXHRzcmM6ICdzcmMvbXlUeXBlcy5kLnRzJyxcclxuXHRkZXN0OiAnbm9kZV9tb2R1bGVzL0B0eXBlcy9teXR5cGVzLydcclxufTtcclxud2FjaEFsbC5wdXNoKHdhdGNoVGFzayk7XHJcbihmdW5jdGlvbihuYW1lOiBzdHJpbmcsIHNyYzogc3RyaW5nIHwgc3RyaW5nW10sIGRlc3Q6IHN0cmluZykge1xyXG5cdFxyXG5cdGd1bHAudGFzayhuYW1lLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRndWxwLnNyYyhzcmMpXHJcblx0XHRcdC5waXBlKHJlbmFtZSgnaW5kZXguZC50cycpKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoZGVzdCkpO1xyXG5cdH0pO1xyXG5cclxufSkod2F0Y2hUYXNrLnRhc2tOYW1lLCB3YXRjaFRhc2suc3JjLCB3YXRjaFRhc2suZGVzdCk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFdhdGNoIGZvciBmaWxlIGNoYW5nZXMgYW5kIHJlLXJ1biB0ZXN0cyBvbiBlYWNoIGNoYW5nZVxyXG4gKi9cclxudmFyIEthcm1hID0gcmVxdWlyZSgna2FybWEnKTtcclxuZ3VscC50YXNrKCdSdW5fS2FybWFfVGVzdHMnLCBmdW5jdGlvbiAoZG9uZSkge1xyXG4gIG5ldyBLYXJtYS5TZXJ2ZXIoe1xyXG4gICAgY29uZmlnRmlsZTogX19kaXJuYW1lICsgJy90ZXN0cy9rYXJtYS5jb25mLmpzJ1xyXG4gIH0sIGRvbmUpLnN0YXJ0KCk7XHJcbn0pO1xyXG5cclxuLy8gXHJcbi8vIFxyXG5cclxuZ3VscC50YXNrKCd3YWNoYScsIGZ1bmN0aW9uKCkge1xyXG5cdHdhY2hBbGwuZm9yRWFjaCh3YWNoYSA9PiB7XHJcblx0XHRjb25zb2xlLmxvZygnV2F0Y2hpbmcnLCB3YWNoYS50YXNrTmFtZSk7XHJcblx0XHRndWxwLndhdGNoKHdhY2hhLnNyYywgW3dhY2hhLnRhc2tOYW1lXSBhcyBndWxwLldhdGNoT3B0aW9ucyk7IC8vIGNhc3RpbmcgYXMgV2F0Y2hPcHRpb25zIGJlY2F1c2Ugb2YgZXJyb3IgVFMyMzQ1OlxyXG5cdFx0Ly8gZXJyb3IgVFMyMzQ1OiBBcmd1bWVudCBvZiB0eXBlICdzdHJpbmdbXScgaXMgbm90IGFzc2lnbmFibGUgdG8gcGFyYW1ldGVyIG9mIHR5cGUgJ1dhdGNoT3B0aW9ucyB8IHVuZGVmaW5lZCdcclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyBzZXQgYWxsVGFza3MgYXMgYW4gYXJyYXkgb2YgbmFtZXMsIGV4YW1wbGU6IFsndHlwZXNjcmlwdHMnLCAnamFkZXMnLCAnaHRtbHMnXVxyXG52YXIgYWxsVGFza3MgPSAoZnVuY3Rpb24oKXtcclxuXHR2YXIgYXJyOiBzdHJpbmdbXSA9IFtdO1xyXG5cdHdhY2hBbGwuZm9yRWFjaCh0YXNrID0+IHtcclxuXHRcdGFyci5wdXNoKHRhc2sudGFza05hbWUpO1xyXG5cdH0pO1xyXG5cdHJldHVybiBhcnI7XHJcbn0pKCk7XHJcbi8vIGFsbFRhc2tzLnB1c2goJ3dhdGNoX2FsbCcpO1xyXG5cclxuZ3VscC50YXNrKCdidWlsZCcsIGZ1bmN0aW9uKCkge1xyXG5cdGlmKHByb2Nlc3MuZW52LkRFVl9FTlYpIHtcclxuXHJcblx0XHRndWxwLnNyYyhbXHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXIvYW5ndWxhci5qcycsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL0B1aXJvdXRlci9hbmd1bGFyanMvcmVsZWFzZS9hbmd1bGFyLXVpLXJvdXRlci5taW4uanMnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9AdWlyb3V0ZXIvYW5ndWxhcmpzL3JlbGVhc2UvYW5ndWxhci11aS1yb3V0ZXIubWluLmpzLm1hcCcsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItYW5pbWF0ZS9hbmd1bGFyLWFuaW1hdGUubWluLmpzJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci1hbmltYXRlL2FuZ3VsYXItYW5pbWF0ZS5taW4uanMubWFwJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci1hcmlhL2FuZ3VsYXItYXJpYS5taW4uanMnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLWFyaWEvYW5ndWxhci1hcmlhLm1pbi5qcy5tYXAnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLW1lc3NhZ2VzL2FuZ3VsYXItbWVzc2FnZXMubWluLmpzJyxcclxuXHRcdFx0XHRcdCdub2RlX21vZHVsZXMvYW5ndWxhci1tZXNzYWdlcy9hbmd1bGFyLW1lc3NhZ2VzLm1pbi5qcy5tYXAnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLWNvb2tpZXMvYW5ndWxhci1jb29raWVzLm1pbi5qcycsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItY29va2llcy9hbmd1bGFyLWNvb2tpZXMubWluLmpzLm1hcCcsXHJcblx0XHRcdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItc2FuaXRpemUvYW5ndWxhci1zYW5pdGl6ZS5taW4uanMnLFxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLXNhbml0aXplL2FuZ3VsYXItc2FuaXRpemUubWluLmpzLm1hcCcsXHJcblxyXG5cdFx0XHRcdFx0J25vZGVfbW9kdWxlcy9hbmd1bGFyLW1hdGVyaWFsL2FuZ3VsYXItbWF0ZXJpYWwuanMnXSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMvYW5ndWxhcicpKTtcclxuXHJcblx0XHRndWxwLnNyYyhbICdub2RlX21vZHVsZXMvYW5ndWxhci1tYXRlcmlhbC9hbmd1bGFyLW1hdGVyaWFsLm1pbi5jc3MnXSlcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvc3R5bGVzaGVldHMnKSk7XHJcblxyXG5cdFx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2Rpc3Qvc29ja2V0LmlvLmpzJylcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMnKSk7XHJcblx0XHRndWxwLnNyYygnbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvZGlzdC9zb2NrZXQuaW8uanMubWFwJylcclxuXHRcdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMnKSk7XHJcblxyXG5cdFx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKVxyXG5cdFx0XHQucGlwZShndWxwLmRlc3QoJ2J1aWxkL3B1YmxpYy9zdHlsZXNoZWV0cycpKTtcclxuXHRcdGd1bHAuc3JjKCdub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzLm1hcCcpXHJcblx0XHRcdC5waXBlKGd1bHAuZGVzdCgnYnVpbGQvcHVibGljL3N0eWxlc2hlZXRzJykpO1xyXG5cdH1cclxuXHJcblx0Z3VscC5zcmMoWydub2RlX21vZHVsZXMvYW5ndWxhci10cmFuc2xhdGUvZGlzdC9hbmd1bGFyLXRyYW5zbGF0ZS5taW4uanMnLFxyXG5cdFx0XHQnbm9kZV9tb2R1bGVzL2FuZ3VsYXItdHJhbnNsYXRlL2Rpc3QvYW5ndWxhci10cmFuc2xhdGUtbG9hZGVyLXN0YXRpYy1maWxlcy8nK1xyXG5cdFx0XHRcdCdhbmd1bGFyLXRyYW5zbGF0ZS1sb2FkZXItc3RhdGljLWZpbGVzLm1pbi5qcyddKVxyXG5cdFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMvYW5ndWxhcicpKTtcclxuXHJcblx0Z3VscC5zcmMoJ25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9mb250cy8qJylcclxuXHRcdC5waXBlKGd1bHAuZGVzdCgnYnVpbGQvcHVibGljL2ZvbnRzJykpO1xyXG5cclxuXHQvLyBndWxwLnNyYygnbm9kZV9tb2R1bGVzL2pxdWVyeS9kaXN0L2pxdWVyeS5taW4uanMnKVxyXG5cdC8vIFx0LnBpcGUoZ3VscC5kZXN0KCdidWlsZC9wdWJsaWMvamF2YXNjcmlwdHMnKSk7XHJcbn0pO1xyXG5hbGxUYXNrcy5wdXNoKCdidWlsZCcsICd3YWNoYScpOyAvLywgJ1J1bl9LYXJtYV9UZXN0cydcclxuXHJcbi8vIEB0eXBlcyBhcmUgaW5jb25zaXN0ZW50OlxyXG5ndWxwLnRhc2soJ2RlZmF1bHQnLCBhbGxUYXNrcyBhcyBhbnkgKTsgLy8gc2hvdWxkIGJlOiBndWxwLnBhcmFsbGVsKCBhbGxUYXNrcyApO1xyXG4iXX0=
