module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'style/style.css' : 'sass/style.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		},
		postcss: {
			options: {
			    map: true,
			    processors: [
			    	require('autoprefixer')({browsers: ['last 1 version']})
			    ]
		  	},
		 	dist: {
		    	src: 'style/style.css'
		  	}
		}
	});
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
	grunt.registerTask('build', ['sass', 'postcss']);
}