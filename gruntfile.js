/*
npm install --save-dev grunt time-grunt grunt-px-to-rem grunt-postcss cssnano autoprefixer css-mqpacker grunt-sass grunt-contrib-uglify grunt-contrib-watch grunt-notify
*/
module.exports = function(grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({

        // Sass
        sass: {
            dev:{
                options: {
                    lineNumbers: false,
                    trace: true,
                    sourcemap: 'inline'
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            },
            build:{
                options: {
                    lineNumbers: false,
                    trace: true,
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        px_to_rem: {
            dev: {
                options: {
                    base:13,
                    fallback: false,
                    fallback_existing_rem: false,
                    max_decimals:5,
                    ignore: [],
                    map: false
                },
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css'],
                    dest: 'css',
                    ext: '.css'
                }]
            },
            build: {
                options: {
                    base:13,
                    fallback: false,
                    fallback_existing_rem: false,
                    max_decimals:5,
                    ignore: [],
                    map: false
                },
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        // Post CSS
        postcss: {
            dev: {
                options: {
                    map:true,
                    processors: [
                        require('autoprefixer')({
                            browsers: ['last 4 versions', '> .25% in US'] 
                        }),
                        require('cssnano')({
                            calc: false,
                            colorMin: false,
                            convertValues: false,
                            discardComments: false,
                            discardUnused: false,
                            zindex: false,
                            reduceIdents: false,
                            mergeIdents: false,
                            minifySelectors: false,
                            minifyFontValues: false,
                            normalizeUrl: false,
                            safe: true,
                            mergeRules:true,
                            core:false
                        })
                        //require('css-mqpacker')({
                        //    expand: true,
                        //    cwd: 'src/css/',
                        //    src: '*.css',
                        //    dest: 'css',
                        //    sort:true
                        //})
                    ]
                },
                src: 'css/*.css'
            },
            build: {
                options: {
                    map:false,
                    processors: [
                        require('autoprefixer')({
                            browsers: ['last 4 versions', '> .25% in US']
                        }),
                        require('cssnano')({
                            calc: false,
                            colorMin: false,
                            convertValues: false,
                            discardUnused: false,
                            zindex: false,
                            reduceIdents: false,
                            mergeIdents: false,
                            minifySelectors: false,
                            minifyFontValues: false,
                            normalizeUrl: false,
                            safe: true,
                            mergeRules: true
                        })
                        //require('css-mqpacker')({
                        //    expand: true,
                        //    cwd: 'src/css/',
                        //    src: '*.css',
                        //    dest: 'css',
                        //    sort:true
                        //})
                    ]
                },
                src: 'css/*.css'
            }
        },

        // Notify
        notify: {
            sass: {
                options: {
                    title: 'Sass',
                    message: 'Compiled'
                }
            }
        },
        // Uglify
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    compress: true,
                    preserveComments: 'all'
                },
                files: [{
                  expand: true,
                  cwd: 'src/js',
                  src: '**/*.js',
                  dest: 'js'
                }],
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            build: {
                options: {
                    mangle: false,
                    compress: true
                },
                files: [{
                  expand: true,
                  cwd: 'src/js',
                  src: '**/*.js',
                  dest: 'js'
                }]
            }
        },

        // Notify
        notify: {
            sass: {
                options: {
                    title: 'Sass',
                    message: 'Compiled'
                }
            },
            js: {
                options: {
                    title: 'Javascript',
                    message: 'Compiled'
                }
            }
        },

        // Watch
        watch: {
            styles: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass:dev', 'px_to_rem:dev', 'postcss:dev', 'notify:sass'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                files: [
                    'css/*.css',
                    '**/*.html'
                ],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-sass'); //libsass
    grunt.loadNpmTasks('grunt-px-to-rem');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register tasks
    grunt.registerTask('default', [
        'sass:dev',
        'px_to_rem:dev',
        'postcss:dev',
        'uglify:dev'
    ]);

    grunt.registerTask('build', [
        'sass:build',
        'px_to_rem:build',
        'postcss:build',
        'uglify:build'
    ]);
};
