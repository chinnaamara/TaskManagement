/**
 * Created by chinna on 11/6/14.
 */

module.exports = function(grunt) {
    (require('load-grunt-tasks'))(grunt);
    grunt.registerTask('serve', ['connect:server']);
    grunt.registerTask('build', ['bower', 'concurrent:build']);
    grunt.registerTask('mini', ['concurrent:mini']);
    grunt.registerTask('all', ['bower', 'default']);
    grunt.registerTask('default', ['concurrent:build', 'concurrent:mini']);
    grunt.registerTask('test', ['jshint', 'karma:spec', 'karma:singleRun']);
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-connect');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-karma');
//    grunt.loadNpmTasks('grunt-bower-task');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true
            },
            lint: ['Gruntfile.js', 'src/**/*.js','spec/**/*_spec.js']
        },

        karma: {
            spec: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },
            singleRun: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: 'build/lib'
                }
            }
        },

        cssmin: {
            combile:{
                files:{
                    'build/css/lib.min.css': ['build/lib/**/*.css'],
                    'build/css/style.min.css': ['src/css/style.css']
                }
            }
        },

        uglify: {
            options: {
                mangle: false,
                sourcemap: true,
                verbose: true
            },
            libs: {
                files: {
                    'build/js/lib.min.js': [
                        'build/lib/jquery/jquery.js',
                        'build/lib/bootstrap/bootstrap.js',
                        'build/lib/lodash/lodash.compat.js',
                        'build/lib/handlebars/handlebars.js',
                        'src/lib/*.js'
                    ],
                    'build/js/all.min.js': [
                        'src/js/tasks.js', 'src/js/home.js', 'src/js/!(login).js'
                    ],
                    'build/js/login.min.js': [
                        'src/js/login.js'
                    ]
                }
            }
        },

        connect: {
            server:{
                options:{
                    port: 9000,
                    keepalive: true,
                    base: ['src/html', 'src/js', 'src/css', 'build/css', 'build/js', 'build/lib']
                }
            }
        },

        watch: {
            html: {
                files: ['src/html/**/*.html'],
                tasks: []
            },
            js: {
                files: ['src/html/**/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['src/css/**/*.css'],
                tasks: ['cssmin']
            },
            options: {
                spawn: true,
                livereload: true
            }
        },

        concurrent: {
            build: ['newer:cssmin', 'newer:uglify', 'newer:jshint'],
            mini: ['serve', 'watch'],
            options:{
                logConcurrentOutput: true
            }
        }

    });
};