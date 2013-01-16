module.exports = function(grunt){

	grunt.initConfig({
		concat: {
			dist: {
				src: [],
				dest: '',
				separator: ';'
			}
		},

		lint: {
			files:[
				'app.js', 'routes.js', 'config.js',
				'public/javascripts/*.js',
				'models/*.js',
				'controllers/*.js'
			]
		},
		jshint: {
	      options: {
	        curly: true,
	        eqeqeq: true,
	        immed: true,
	        latedef: true,
	        newcap: true,
	        noarg: true,
	        sub: true,
	        undef: true,
	        boss: true,
	        eqnull: true,
	        node: true,
	        es5: true,
	        strict: false
	      },
	      globals: {
	      	jQuery: true,
	      	exports: true,
	      	document: true,
	      	$: true
	      }
	    }
	});

	// Default task.
  	grunt.registerTask('default', 'lint');
};