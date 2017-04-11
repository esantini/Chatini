/*
    Generated from typescript file
*/

import * as gulp from 'gulp';
import * as tsc from 'gulp-typescript';
//
var wachAll: Array<{ name:string, src: string | string[], dest: string }> = [];
var wacha: { name: string, src: string | string[], dest: string };
//
wacha = {
    name: "myTypeScripts" ,
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
})(wacha.name, wacha.src, wacha.dest);

//
//

wacha = {
    name: "allButTs",
    src: ['src/**/*', '!src/**/*.ts'],
    dest: 'build/'
};
wachAll.push(wacha);
(function(name: string, src: string | string[], dest: string) {
	
	gulp.task(name, function() {
		gulp.src(src)
			.pipe(gulp.dest(dest));
	});

})(wacha.name, wacha.src, wacha.dest);
//
wacha = {
    name: "gulpfile",
    src: 'gulpfile.ts',
    dest: ''
}
wachAll.push(wacha);
(function(name: string, src: string | string[], dest: string) {
	
    gulp.task(name, function() {
        var tsProject = tsc.createProject('tsconfig.json');
        gulp.src(src)
            .pipe(tsProject())
            .pipe(gulp.dest(dest));
    });

})(wacha.name, wacha.src, wacha.dest);
//
//
wacha = {
    name: "tests",
    src: 'tests/**/*.ts',
    dest: 'tests'
}
wachAll.push(wacha);
(function(name: string, src: string | string[], dest: string) {
	
    gulp.task(name, function() {
        var tsProject = tsc.createProject('tsconfig.json');
        gulp.src(src)
            .pipe(tsProject())
            .pipe(gulp.dest(dest));
    });

})(wacha.name, wacha.src, wacha.dest);
// 
// 
gulp.task('watch_all', function() {
    wachAll.forEach(wacha => {
        // var src:string = typeof wacha.src === 'string' ?  wacha.src : wacha.src[0];
        gulp.watch(wacha.src, [wacha.name]);
    });
});

// set allTasks as an array of names, example: ['typescripts', 'jades', 'htmls']
var allTasks = (function(){
    var arr: string[] = [];
    wachAll.forEach(task => {
        console.log('Wacha', task.name);
        arr.push(task.name);
    });
    return arr;
})();
allTasks.push('watch_all');

gulp.task('default', allTasks );
