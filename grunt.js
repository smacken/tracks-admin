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
				'public/javascripts/resorts.js',
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
	        strict: false,
	        laxcomma: true
	      },
	      globals: {
	      	jQuery: true,
	      	exports: true,
	      	document: true,
	      	$: true
	      }
	    },

	    // cyclomatic complexity of files
	    complexity: {
            generic: {
                src: [
                	'app.js', 'routes.js', 'errors.js',
                	'controllers/*.js', 
                	'models/*.js',
                	'public/javascripts/resorts.js'
                ],
                options: {
                    cyclomatic: 3,
                    halstead: 8,
                    maintainability: 100
                }
            }
        }
	});
	
	// imported tasks
	grunt.loadNpmTasks('grunt-complexity');
	
	// Default task.
  	grunt.registerTask('default', 'lint complexity');
};