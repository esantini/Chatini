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
	taskName: "serverTypeScripts",
	src: ['src/**/*.ts', '!src/modules/**/client/**/*'],
	dest: 'build/'
};
wachAll.push(watchTask);
(function(name: string, src: string | string[], dest: string): void {

	var tsProject = tsc.createProject('tsconfig.json');

	// Transpiles typescript files from the source to the build.
	gulp.task(name, function() {
		
		gulp.src( src )
			
			.pipe(sourcemaps.init())
				.pipe(tsProject())
			.pipe(sourcemaps.write('.', { sourceRoot: '../src/', includeContent: false }))
			.pipe(gulp.dest( dest ));

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
(function(name: string, src: string | string[], dest: string): void {

	var tsProject2 = tsc.createProject('tsconfig.json');

	// Transpiles & concatenates client's typescript files into a single file in /public
	gulp.task(name, function() {

		// make sure main.ts goes first to register angular modules and other stuff that needs executing first.
		gulp.src( [ './src/modules/core/client/main.ts', src as string ] )
			
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
			.pipe(sourcemaps.init())
			.pipe(less({
				paths: [ path.join(__dirname, 'less', 'includes')]
			}).on('error', gUtil.log))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest( dest ));
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
import * as flatten from 'gulp-flatten';
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

		gulp.src([	'node_modules/angular/angular.js',
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
					'node_modules/angular-material/angular-material.js'])
			.pipe(gulp.dest('build/public/javascripts/angular'));

		gulp.src([ 'node_modules/angular-material/angular-material.min.css'])
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

// @types are inconsistent:
gulp.task('default', allTasks as any ); // should be: gulp.parallel( allTasks );
