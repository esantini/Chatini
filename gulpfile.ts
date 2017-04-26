/*
	Generated from typescript file
*/

import * as gulp from 'gulp';
import * as tsc from 'gulp-typescript';
//
interface Wacha {
	taskName: string,
	src: string | string[],
	dest: string
}
var wacha: Wacha;
var wachAll: Array<Wacha> = [];

//
wacha = {
	taskName: "myTypeScripts",
	src: 'src/**/*.ts',
	dest: 'build/'
};
wachAll.push(wacha);
(function(name: string, src: string | string[], dest: string): void {
	var tsProject = tsc.createProject('tsconfig.json');
	gulp.task( name , function() {
		gulp.src(src)
			.pipe(tsProject())
			.pipe(gulp.dest( dest ));
	});
})(wacha.taskName, wacha.src, wacha.dest);

//
//

wacha = {
	taskName: "move_plain_files",
	src: ['src/**/*', '!src/**/*.ts', '!src/**/*.less'],
	dest: 'build/'
};
wachAll.push(wacha);
(function(name: string, src: string | string[], dest: string) {
	
	gulp.task(name, function() {
		gulp.src(src)
			.pipe(gulp.dest(dest));
	});

})(wacha.taskName, wacha.src, wacha.dest);
//
wacha = {
	taskName: "gulpfile",
	src: 'gulpfile.ts',
	dest: ''
};
wachAll.push(wacha);
(function(name: string, src: string | string[], dest: string) {
	
	gulp.task(name, function() {
		var tsProject = tsc.createProject('tsconfig.json');
		gulp.src(src)
			.pipe(tsProject())
			.pipe(gulp.dest(dest));
	});

})(wacha.taskName, wacha.src, wacha.dest);
//
//
wacha = {
	taskName: "tests",
	src: 'tests/**/*.ts',
	dest: 'tests'
};
wachAll.push(wacha);
(function(name: string, src: string | string[], dest: string) {
	
	gulp.task(name, function() {
		var tsProject = tsc.createProject('tsconfig.json');
		gulp.src(src)
			.pipe(tsProject())
			.pipe(gulp.dest(dest));
	});

})(wacha.taskName, wacha.src, wacha.dest);
// 
// 
gulp.task('watch_all', function() {
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
