/*
	Generated from typescript file
*/

import * as gulp from 'gulp';
import * as tsc from 'gulp-typescript';
import * as less from 'gulp-less';
import * as path from 'path';

//
interface TaskToWatch {
	taskName: string,
	src: string | string[],
	dest: string
}
var watchTask: TaskToWatch;
var wachAll: Array<TaskToWatch> = [];

//
watchTask = {
	taskName: "myTypeScripts",
	src: 'src/**/*.ts',
	dest: 'build/'
};
wachAll.push(watchTask);
(function(name: string, src: string | string[], dest: string): void {
	var tsProject = tsc.createProject('tsconfig.json');
	gulp.task( name , function() {
		gulp.src(src)
			.pipe(tsProject())
			.pipe(gulp.dest( dest ));
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
(function(name: string, src: string | string[], dest: string): void {
	var tsProject = tsc.createProject('tsconfig.json');
	gulp.task( name , function() {
		gulp.src(src)
			.pipe(less({
				paths: [ path.join(__dirname, 'less', 'includes')]
			}))
			.pipe(gulp.dest( dest ));
	});
})(watchTask.taskName, watchTask.src, watchTask.dest);

//
//

watchTask = {
	taskName: "move_plain_files",
	src: ['src/**/*', '!src/**/*.ts', '!src/**/*.less'],
	dest: 'build/'
};
wachAll.push(watchTask);
(function(name: string, src: string | string[], dest: string) {
	
	gulp.task(name, function() {
		gulp.src(src)
			.pipe(gulp.dest(dest));
	});

})(watchTask.taskName, watchTask.src, watchTask.dest);
//
watchTask = {
	taskName: "gulpfile",
	src: 'gulpfile.ts',
	dest: ''
};
wachAll.push(watchTask);
(function(name: string, src: string | string[], dest: string) {
	
	gulp.task(name, function() {
		var tsProject = tsc.createProject('tsconfig.json');
		gulp.src(src)
			.pipe(tsProject())
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
(function(name: string, src: string | string[], dest: string) {
	
	gulp.task(name, function() {
		var tsProject = tsc.createProject('tsconfig.json');
		gulp.src(src)
			.pipe(tsProject())
			.pipe(gulp.dest(dest));
	});

})(watchTask.taskName, watchTask.src, watchTask.dest);
// 
// 
gulp.task('wacha', function() {
	wachAll.forEach(wacha => {
		// var src:string = typeof wacha.src === 'string' ?  wacha.src : wacha.src[0];
		gulp.watch(wacha.src, [wacha.taskName]);
	});
});

// set allTasks as an array of names, example: ['typescripts', 'jades', 'htmls']
var allTasks = (function(){
	var arr: string[] = [];
	wachAll.forEach(task => {
		console.log('Wacha', task.taskName);
		arr.push(task.taskName);
	});
	return arr;
})();
// allTasks.push('watch_all');

gulp.task('build', function() {
	gulp.src('node_modules/angular/angular.min.js')
		.pipe(gulp.dest('build/public/javascripts/angular'));

	// gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
	// 	.pipe(gulp.dest('build/public/javascripts'));

	gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest('build/public/stylesheets'));

	gulp.src('node_modules/bootstrap/dist/fonts/*')
		.pipe(gulp.dest('build/public/fonts'));

	// gulp.src('node_modules/jquery/dist/jquery.min.js')
	// 	.pipe(gulp.dest('build/public/javascripts'));
});
allTasks.push('build');

gulp.task('default', allTasks );
