/*
	Generated from typescript file
*/

import * as gulp from 'gulp';
import * as gUtil from 'gulp-util';
import * as tsc from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
import * as less from 'gulp-less';
import * as concat from 'gulp-concat';
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
//

watchTask = {
	taskName: "myTypeScripts",
	src: 'src/**/*.ts',
	dest: 'build/'
};
wachAll.push(watchTask);
(function(name: string, src: string | string[], dest: string): void {

	var tsProject = tsc.createProject('tsconfig.json');

	var tsProject2 = tsc.createProject('tsconfig.json');
	var clientScripts = 'src/modules/**/client/**/*.ts';

	// Transpiles typescript files from the source to the build.
	gulp.task(name, function() {
		
		gulp.src( [ src as string, '!'+clientScripts ] )
			
			.pipe(sourcemaps.init())
				.pipe(tsProject())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest( dest ));

		gulp.src(clientScripts)
			
			.pipe(sourcemaps.init())
				.pipe(tsProject2())
				.pipe(concat('main.min.js'))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest( dest + 'public/javascripts/' ));
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

	gulp.task( name , function() {
		gulp.src(src)
			.pipe(less({
				paths: [ path.join(__dirname, 'less', 'includes')]
			}).on('error', gUtil.log))
			.pipe(gulp.dest( dest ));
	});

})(watchTask.taskName, watchTask.src, watchTask.dest);

//
//

import * as flatten from 'gulp-flatten';
watchTask = {
	taskName: "myViews",
	src: 'src/modules/**/client/views/**/*.html',
	dest: 'build/public/views/'
};
wachAll.push(watchTask);
(function(name: string, src: string | string[], dest: string): void {

	gulp.task( name , function() {
		gulp.src(src)
			.pipe(flatten())
			.pipe(gulp.dest( dest ));

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
(function(name: string, src: string | string[], dest: string) {
	
	gulp.task(name, function() {
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
(function(name: string, src: string | string[], dest: string) {
	
	gulp.task(name, function() {
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
		console.log('Watching', wacha.taskName);
		gulp.watch(wacha.src, [wacha.taskName]);
	});
});

// set allTasks as an array of names, example: ['typescripts', 'jades', 'htmls']
var allTasks = (function(){
	var arr: string[] = [];
	wachAll.forEach(task => {
		arr.push(task.taskName);
	});
	return arr;
})();
// allTasks.push('watch_all');

gulp.task('build', function() {
	if(process.env.DEV_ENV) {
		gulp.src('node_modules/angular/angular.js')
			.pipe(gulp.dest('build/public/javascripts/angular'));

		gulp.src('node_modules/angular-route/angular-route.js')
			.pipe(gulp.dest('build/public/javascripts/angular'));
	}
	// gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
	// 	.pipe(gulp.dest('build/public/javascripts'));

	gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest('build/public/stylesheets'));

	gulp.src('node_modules/bootstrap/dist/fonts/*')
		.pipe(gulp.dest('build/public/fonts'));

	// gulp.src('node_modules/jquery/dist/jquery.min.js')
	// 	.pipe(gulp.dest('build/public/javascripts'));
});
allTasks.push('build', 'wacha');

gulp.task('default', allTasks );
