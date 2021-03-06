module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: ['public/components/jquery/jquery.min.js', 
                      'public/components/modernizr/modernizr-latest.js', 
                      'public/components/bootstrap/bootstrap.min.js', 
                      'public/components/knockout.js/knockout.js'],
                dest: 'public/components/base.js',
                separator: ';'
            },
            css: {
                src: ['public/stylesheets/style.css', 'public/stylesheets/bootstrap.min.css'],
                dest: 'public/stylesheets/main.css'
            },
            // page level concats
            trailMap: {
                src: ['public/components/kinetic/kinetic.min.js', 'public/javascripts/trail-map.js'],
                dest: 'public/components/trail-map.js'
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
          files:[
                'app.js', 'routes.js', 'config.js',
                'public/javascripts/*.js',
                'models/*.js',
                'controllers/*.js'
            ],
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
            laxcomma: true,
            browser: true,
            globals: {
                jQuery: true,
                exports: true,
                document: true,
                $: true,
                yepnope: true,
                Kinetic: true,
                Image: true,
                ko: true
              }
          },
          
        },

        // file minification
        min: {
            dist: {
              src: ['models/resort.js', 'models/track.js'],
              dest: 'models/entities.min.js'
            }
         },

        // cyclomatic complexity of files
        complexity: {
            generic: {
                src: [
                    'app.js', 'routes.js', 'errors.js',
                    'controllers/*.js', 
                    'models/*.js',
                    'public/javascripts/resorts.js',
                ],
                options: {
                    cyclomatic: 3,
                    halstead: 8,
                    maintainability: 100
                }
            }
        },

        watch: {
            files: '<config:jshint.files>',
            tasks: 'jshint complexity'
        },

        clean: {
            min: ['public/javascripts/*.min.js', 
                  'public/stylesheets/main.min.css', 
                  'public/components/base.min.js', 
                  'public/components/trail-map.min.js',
                  'public/components/resorts.min.js'],
            concat: ['public/components/base.js', 'public/components/trail-map.js']
        },

        cssmin: {
            compress: {
                files: {
                    'public/stylesheets/main.min.css' : ['public/stylesheets/main.css']
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    'public/components/base.min.js' : ['public/components/base.js'],
                    'public/components/resorts.min.js' : ['public/javascripts/resorts.js'],
                    'public/components/trail-map.min.js': ['public/components/trail-map.js']
                }
            }
        }
    });
    
    // imported tasks
    //grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin'); 
    grunt.loadNpmTasks('grunt-contrib-uglify');
        
    grunt.loadNpmTasks('grunt-complexity');
    
    // Default task.
    grunt.registerTask('default', ['clean', 'jshint', 'complexity', 'concat', 'cssmin', 'uglify']);
    grunt.registerTask('development', 'watch lint complexity');
    grunt.registerTask('production', 'lint complexity');
};